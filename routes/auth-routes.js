const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

// Setup CRUD operations for users
const userDao = require('../modules/user-dao');

// GET login page
router.get('/login', function (req, res) {
    res.locals.title = 'Login | Fluffy Frogs';

    // If logged in, redirect to 'admin page'
    // Otherwise, render login form
    if (res.locals.user) {
        res.redirect('/admin');
    } else {
        res.render('login');
    }
});

// POST login form
router.post('/login', async function (req, res) {
    // Get the username and password submitted in the form
    const username = req.body.username;
    const password = req.body.password;

    // Find a matching user in the database
    const user = await userDao.retrieveUserWithCredentials(username, password);

    // If user exists in database
    if (user) {
        // Successful authentication - assign user an authToken, save token in a cookie, and redirect to the homepage.
        const authToken = uuid();
        user.authToken = authToken;
        await userDao.updateUser(user);
        res.cookie('authToken', authToken);
        res.locals.user = user;
        res.redirect('/admin');
    }
    // If user does not exist in databse
    else {
        // Failed authentication - redirect back to login
        res.locals.user = null;
        res.setToastMessage('Username or password is incorrect!');
        res.redirect('/login');
    }
});

// GET logout request
// Delete the authToken cookie.
// redirect to "/", supplying a "logged out successfully" message.
router.get('/logout', function (req, res) {
    res.clearCookie('authToken');
    res.locals.user = null;
    res.setToastMessage('Successfully logged out!');
    res.redirect('/');
});

// Export router
module.exports = router;
