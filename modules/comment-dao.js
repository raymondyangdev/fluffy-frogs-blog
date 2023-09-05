// Setup dao
const SQL = require('sql-template-strings');
const dbPromise = require('./database.js');

async function createComment(comment) {
    const db = await dbPromise;

    const result = await db.run(
        SQL`insert into comments (content, timeofComment, author, articleId) values (${comment.content}, datetime('now'), ${comment.userId}, ${comment.articleId})`
    );

    comment.id = result.lastID;
}

async function retrieveCommentsByArticleId(articleId) {
    const db = await dbPromise;

    const result = await db.all(
        SQL`select c.author, c.id, c.articleId, u.username, u.name, u.avatarId, c.content, c.timeOfComment from comments as c, users as u where c.author = u.id and c.articleId = ${articleId}`
    );

    return result;
}

async function retrieveCommentsByCommentId(id) {
    const db = await dbPromise;

    const result = await db.get(SQL`select * from comments where id = ${id}`);

    return result;
}

async function updateComment(comment) {
    const db = await dbPromise;

    await db.run(SQL`update comments
        set content = ${comment.content}, timeOfComment = datetime('now') where id = ${comment.id} and author = ${comment.userId}`);
}

async function deleteCommentsById(id) {
    const db = await dbPromise;

    await db.run(SQL`delete from comments where id = ${id}`);
}

// Export functions
module.exports = {
    createComment,
    retrieveCommentsByArticleId,
    retrieveCommentsByCommentId,
    updateComment,
    deleteCommentsById,
};
