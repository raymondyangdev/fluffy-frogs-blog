// Setup dao
const SQL = require('sql-template-strings');
const dbPromise = require('./database.js');


// articles(id, title, content, photo, timestamp, userId, plantId) 
// (${article.id}, ${article.title}, ${article.content}, ${article.photo}, ${article.timestamp}, ${article.plantId})`


async function createArticle(article) {
    const db = await dbPromise;
    const result =
        await db.run(SQL`insert into articles (title, content, articlePhoto, timeOfPost, userId, plantId) values 
    (${article.title}, ${article.content}, ${article.articlePhoto}, datetime('now'), ${article.userId}, ${article.plantId})`);
    article.id = result.lastID;
}

async function retrieveArticlesById(id) {
    const db = await dbPromise;
    const result = await db.get(
        SQL`select id, title, timeOfPost, userId, plantId, content, articlePhoto from articles where id = ${id}`
    );

    return result;
}

async function retrieveArticlesByUser(id) {
    const db = await dbPromise;
    const usersArticles = await db.all(
        SQL`select * from articles where userId = ${id}`
    );

    return usersArticles;
}

async function retrieveArticlesByPlant(plant) {
    const db = await dbPromise;
    const plantArticles = await db.run(
        SQL`select * from articles where plantId = ${plant.id}`
    );

    return plantArticles;
}
// Needs testing/updating
async function retrieveAllArticlesByTag(tag) {
    const db = await dbPromise;

    const result = await db.all(
        SQL`select * from articles where articles.id = tags_in_articles.articelId and tags_in_articles.tagId = tags.id and tags.name = ${tag}`
    );

    return result;
}

async function retrieveAllArticlesBySearch(query) {
    const db = await dbPromise;

    const result = await db.all(
        SQL`select distinct a.id, a.title, a.timeOfPost, a.userId, a.plantId, a.articlePhoto, t.tag, u.name, u.avatarId 
        from articles as a, users as u, tags_in_articles as tia, tags as t, plants as p 
        where a.userId = u.id
        and (a.title like '%' || ${query} || '%' 
        or t.tag like '%' || ${query} || '%' and tia.tagId = t.id 
        or p.name like '%' || ${query} || '%' and p.id = a.plantId 
        or p.season like '%' || ${query} || '%' and p.id = a.plantId)`
    );

    return result;
}

async function retrieveAllArticles() {
    const db = await dbPromise;
    const allArticles = await db.all(SQL`select * from articles`);
    return allArticles;
}

async function updateArticle(article) {
    const db = await dbPromise;

    await db.run(SQL`update articles
    set title = ${article.title},
        content = ${article.content},
        articlePhoto = ${article.articlePhoto},
        plantId = ${article.plantId},
        timeOfPost = datetime('now')
    where id = ${article.id}`);
}

async function deleteArticle(id) {
    const db = await dbPromise;
    await db.run(SQL` delete from articles where id = ${id}`);
}

// Export functions
module.exports = {
    createArticle,
    retrieveArticlesById,
    retrieveArticlesByUser,
    retrieveArticlesByPlant,
    retrieveAllArticlesByTag,
    retrieveAllArticlesBySearch,
    retrieveAllArticles,
    updateArticle,
    deleteArticle,
};
