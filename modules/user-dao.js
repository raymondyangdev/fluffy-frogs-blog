// Setup dao
const SQL = require('sql-template-strings');
const dbPromise = require('./database.js');

// Set password encrypter
const encrypter = require('./bcrypt.js');

/**
 * Inserts the given user into the database. Then, reads the ID which the database auto-assigned, and adds it
 * to the user.
 *
 * @param user the user to insert
 */
async function createUser(user) {
    const db = await dbPromise;

    // Encrypt password before adding to DB
    const encryptedPassword = await encrypter.hashPassword(user.password);

    const result = await db.run(
        SQL`insert into users (username, usernameLower, password, name, dob, aboutMe, avatarId) values (${
            user.username
        }, ${user.username.toLowerCase()}, ${encryptedPassword}, ${
            user.name
        }, ${user.dob}, ${user.aboutMe}, ${user.avatarId})`
    );

    user.id = result.lastID;
}

/**
 * Gets the user with the given id from the database.
 * If there is no such user, undefined will be returned.
 *
 * @param {number} id the id of the user to get.
 */
async function retrieveUserById(id) {
    const db = await dbPromise;

    const user = await db.get(SQL`select * from users where id = ${id}`);

    return user;
}

/**
 * Gets the user with the given username and password from the database.
 * If there is no such user, undefined will be returned.
 *
 * @param {string} username the user's username
 * @param {string} password the user's password
 */
async function retrieveUserWithCredentials(username, password) {
    const db = await dbPromise;

    const user = await db.get(
        SQL`select * from users where usernameLower = ${username.toLowerCase()}`
    );

    if (user) {
        const passwordIsCorrect = await encrypter.comparePassword(
            password,
            user.password
        );

        if (passwordIsCorrect) {
            return user;
        }
    }

    return undefined;
}

/**
 * Gets the user with the given authToken from the database.
 * If there is no such user, undefined will be returned.
 *
 * @param {string} authToken the user's authentication token
 */
async function retrieveUserWithAuthToken(authToken) {
    const db = await dbPromise;

    const user = await db.get(
        SQL`select * from users where authToken = ${authToken}`
    );

    return user;
}

/**
 * Gets an array of all users from the database.
 */
async function retrieveAllUsers() {
    const db = await dbPromise;

    const users = await db.all(SQL`select * from users`);

    return users;
}

/**
 * Gets an array of all users from the database.
 */
async function retrieveAllUsernames() {
    const db = await dbPromise;

    const users = await db.all(SQL`select username from users`);

    return users;
}

/**
 * Updates the given user in the database, not including auth token
 *
 * @param user the user to update
 */
async function updateUser(user) {
    const db = await dbPromise;

    await db.run(SQL`update users
        set username = ${user.username}, password = ${user.password},
            name = ${user.name}, authToken = ${user.authToken}
        where id = ${user.id}`);
}

async function updateUserInfo(user) {
    const db = await dbPromise;

    await db.run(SQL`update users
        set name = ${user.name},
            dob = ${user.dob},
            aboutMe = ${user.aboutMe},
            avatarId = ${user.avatarId}
        where id = ${user.id}`);
}

/**
 * Deletes the user with the given id from the database.
 *
 * @param {number} id the user's id
 */
async function deleteUser(id) {
    const db = await dbPromise;

    await db.run(SQL`
        delete from users
        where id = ${id}`);
}

// Export functions
module.exports = {
    createUser,
    retrieveUserById,
    retrieveUserWithCredentials,
    retrieveUserWithAuthToken,
    retrieveAllUsers,
    retrieveAllUsernames,
    updateUser,
    updateUserInfo,
    deleteUser,
};
