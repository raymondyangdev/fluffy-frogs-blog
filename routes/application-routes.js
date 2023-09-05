const express = require("express");
const router = express.Router();
const { verifyAuthenticated } = require('../middleware/auth-middleware.js');


const plantDao = require('../modules/plant-dao');

//Setup CRUD operations for articles
const articlesDao = require('../modules/article-dao');

router.get('/', async function (req, res) {
    res.locals.allArticles = await articlesDao.retrieveAllArticles();
    res.render('home');
});

// Search router
router.get('/search', async function (req, res) {
    const query = req.query.search;
    const results = await articlesDao.retrieveAllArticlesBySearch(query);
    res.locals.results = results;
    res.locals.query = query;
    res.render('search-results');
});

// Verify a user is logged in before rendering admin page
router.get('/admin', verifyAuthenticated, async function (req, res) {
    res.locals.articles = await articlesDao.retrieveArticlesByUser(
        res.locals.user.id
    );
    res.locals.title = `Admin | Fluffy Frogs`;
    res.render('admin');
});

router.get('/about', function (req, res) {
    res.locals.title = 'Title | Fluffy Frogs';
    res.render('about');
});

router.get('/plants', async function (req, res) {   
    res.render('plantIndex');
 });  


//function to help plant ID router. 
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//plant ID router
router.get('/plants/:id', async function (req, res) {
    const plantSelected = req.params.id;
    const plantInfo = await plantDao.retrievePlantByName(
        capitalizeFirstLetter(plantSelected)
    );
    res.locals.title = `${plantInfo.name} | Fluffy Frogs`;
    res.render('plants', { plantInfo });
});

// Get plants by season
router.get('/retrievePlants/:season', async function (req, res) {
    const season = req.params.season;
    const plants = await plantDao.retrieveAllPlantsBySeason(season);
    res.locals.plants = plants;
    res.locals.allArticles = await articlesDao.retrieveAllArticles();
    res.render('home');
});

module.exports = router;