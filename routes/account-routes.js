const express = require('express');
const router = express.Router();

// Setup CRUD operations for users
const userDao = require('../modules/user-dao');

// GET sign up page
router.get('/signup', function (req, res) {
    res.locals.title = 'Sign Up | Fluffy Frogs';
    res.locals.user = req.cookies.savedInfo;
    res.render('signup');
});

// POST request to create a new account
router.post('/signup', async function (req, res) {
    const user = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        dob: req.body.dob,
        aboutMe: req.body.aboutMe,
        avatarId: req.body.avatarId,
    };

    // Save entered info to a cookie so user doesn't have to reenter
    res.cookie('savedInfo', user);

    if (req.body.password !== req.body.repeatPassword) {
        res.setToastMessage(`Passwords don't match!`);
        res.redirect('/signup');
    } else {
        // Create user and clear savedInfo cookie
        try {
            await userDao.createUser(user);
            res.clearCookie('savedInfo');
            res.setToastMessage('Account created successfully!');
            res.redirect('/login');
        } catch (error) {
            res.setToastMessage('The username is already taken!');
            res.redirect('/signup');
        }
    }
});

// GET request to delete account
// Clear authToken and savedInfo cookie if it exists
// Clear res.locals.user
// Then redirect to home page
router.get('/admin/deleteAccount', async function (req, res) {
    await userDao.deleteUser(res.locals.user.id)
    res.clearCookie('authToken');
    res.clearCookie('savedInfo')
    res.locals.user = null;
    res.setToastMessage('Account deleted!');
    res.redirect('/');
});

// POST request to update account information
router.post('/admin/edit', async function (req, res) {
    // Collects info to update
    const userInfo = {
        id: res.locals.user.id,
        name: req.body.name,
        dob: req.body.dob,
        aboutMe: req.body.aboutMe,
        avatarId: req.body.avatarId,
    };

    // Update info from admin page
    await userDao.updateUserInfo(userInfo);

    // Then let the user know that their account info has updated with a toast message
    res.setToastMessage('Account details updated!');

    // Then redirect them back to admin page
    res.redirect('/admin');
})

// Requests a list of all usernames
router.get('/retrieveAllUsers', async function (req, res) {
    const allUsers = await userDao.retrieveAllUsernames();

    res.json(allUsers);
});

// Export router
module.exports = router;
