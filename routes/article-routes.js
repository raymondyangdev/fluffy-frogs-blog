const express = require('express');
const router = express.Router();
const { verifyAuthenticated } = require('../middleware/auth-middleware.js');
const upload = require('../middleware/multer-uploader.js');

// File system
const fs = require('fs');
const jimp = require('jimp');

// Setup CRUD operations for users
const userDao = require('../modules/user-dao');

//Setup CRUD operations for articles
const articlesDao = require('../modules/article-dao');

//Setup CRUD operations for comments
const commentsDao = require('../modules/comment-dao');

// Load article submission page
router.get('/contribute', verifyAuthenticated, function (req, res) {
    res.locals.title = 'Submit Article';
    if (req.cookies.savedArticle) {
        res.locals.savedArticle = req.cookies.savedArticle;
    }
    res.render('contribute');
});

// Submit article
router.post(
    '/uploadblog',
    upload.single('articlePhoto'),
    async function (req, res) {
        const fileInfo = req.file;

        // Move the image into the images folder
        const oldFileName = fileInfo.path;
        const newFileName = `./public/images/articles/${fileInfo.originalname}`;
        fs.renameSync(oldFileName, newFileName);

        // Resize photo and generate thumbnail
        const thumbnail = await jimp.read(newFileName);
        thumbnail.resize(320, jimp.AUTO);
        await thumbnail.write(
            `./public/images/articles/thumbnails/${fileInfo.originalname}`
        );

        const article = {
            title: req.body.articleTitle,
            content: req.body.content,
            plantId: req.body.plantId,
            userId: res.locals.user.id,
            articlePhoto: fileInfo.originalname,
        };

        res.cookie('savedArticle', article);

        if (article.content == '') {
            res.setToastMessage(`Please write some content for your article!`);
            res.redirect('/contribute');
        } else {
            try {
                await articlesDao.createArticle(article);
                res.clearCookie('savedArticle');
                res.redirect('/admin');
            } catch (error) {
                res.setToastMessage(
                    `Oops, that wasn't supposed to happen! Please try again!`
                );
                res.redirect('/contribute');
            }
        }
    }
);

// For embedded images in TinyMCE
router.post('/uploadImg', upload.any(), async function (req, res) {
    const fileInfo = req.files[0];

    const oldFileName = fileInfo.path;
    const newFileName = `./public/images/articles/uploads/${fileInfo.originalname}`;
    fs.renameSync(oldFileName, newFileName);

    res.send({
        location: `/images/articles/uploads/${fileInfo.originalname}`,
    });
});

// Load articles
router.get('/articles/:id', async function (req, res) {
    // Fetch article id from parameter and then retrieve the article
    const articleId = req.params.id;
    const article = await articlesDao.retrieveArticlesById(articleId);
    res.locals.article = article;
    res.locals.author = await userDao.retrieveUserById(
        res.locals.article.userId
    );

    // Fetch comments for the article
    const comments = await commentsDao.retrieveCommentsByArticleId(articleId);
    res.locals.comments = comments;

    res.locals.title = `${article.title} | Fluffy Frogs`;

    res.render('article');
});

// POST request for commenting
router.post('/postComment', async function (req, res) {
    const comment = {
        articleId: req.body.articleId,
        userId: res.locals.user.id,
        content: req.body.comments,
    };
    await commentsDao.createComment(comment);

    res.redirect(`/articles/${req.body.articleId}`);
});

// GET edit comment page
router.get('/comment/edit/:id', async function (req, res) {
    const commentId = req.params.id;
    const comment = await commentsDao.retrieveCommentsByCommentId(commentId);

    // Basic function to verify that the user editing the comment is the same as the original poster
    // If not, redirect back to article
    if (res.locals.user.id == comment.author) {
        res.locals.article = await articlesDao.retrieveArticlesById(
            comment.articleId
        );
        res.locals.comment = comment;
        res.render('edit-comment');
    } else {
        res.setToastMessage(`You cannot edit that comment!`);
        res.redirect(`/articles/${comment.articleId}`);
    }
});

// Update comment
router.post('/updateComment', async function (req, res) {
    const comment = {
        id: req.body.commentId,
        articleId: req.body.articleId,
        userId: res.locals.user.id,
        content: req.body.comments,
    };
    await commentsDao.updateComment(comment);
    res.redirect(`/articles/${req.body.articleId}`);
})

// Router to process comment deletion
router.get('/comment/:id/delete', async function (req, res) {
    const commentId = req.params.id;

    // Get the comments id for redirection later
    const comments = await commentsDao.retrieveCommentsByCommentId(commentId);

    await commentsDao.deleteCommentsById(commentId);

    res.redirect(`/articles/${comments.articleId}`);
})

// Load edit page
router.get('/edit/:id', async function (req, res) {
    const articleId = req.params.id;
    const article = await articlesDao.retrieveArticlesById(articleId);
    res.locals.article = article;
    res.render('edit');
});

// Edit articles
router.post(
    '/editblog',
    upload.single('articlePhoto'),
    async function (req, res) {
        const fileInfo = req.file;
        let article = {
            title: req.body.articleTitle,
            content: req.body.content,
            plantId: req.body.plantId,
            userId: res.locals.user.id,
            articlePhoto: '',
            id: req.body.articleId,
        };

        if (fileInfo === undefined) {
            article.articlePhoto = `${req.body.articlePhoto}`;
        } else {
            const oldFileName = fileInfo.path;
            const newFileName = `./public/images/articles/${fileInfo.originalname}`;
            fs.renameSync(oldFileName, newFileName);

            // Resize photo and generate thumbnail
            const thumbnail = await jimp.read(newFileName);
            thumbnail.resize(320, jimp.AUTO);
            await thumbnail.write(
                `./public/images/articles/thumbnails/${fileInfo.originalname}`
            );

            article.articlePhoto = `${fileInfo.originalname}`;
        }
        await articlesDao.updateArticle(article);
        res.setToastMessage('Article saved!');
        res.redirect(`/articles/${article.id}`);
    }
);

// Delete articles
router.get('/articles/:id/delete', async function (req, res) {
    const articleId = req.params.id;
    await articlesDao.deleteArticle(articleId);
    res.redirect('/admin');
});

module.exports = router;
