// Setup dao
const SQL = require('sql-template-strings');
const dbPromise = require('./database.js');

async function retrievePlantById(id) {
    const db = await dbPromise;

    const result = await db.get(SQL`select * from plants where id = ${id}`);

    return result;
}

async function retrieveAllPlantsBySeason(season) {
    const db = await dbPromise;

    const result = await db.all(
        SQL`select * from plants where season = ${season}`
    );

    return result;
}

async function retrievePlantByName(name) {
    const db = await dbPromise;

    const result = await db.get(SQL`select * from plants where name = ${name}`);

    return result;
}

async function retrieveAllPlants() {
    const db = await dbPromise;

    const result = await db.all(SQL`select * from plants`);

    return result;
}

// Export functions
module.exports = {
    retrievePlantById,
    retrieveAllPlants,
    retrieveAllPlantsBySeason,
    retrievePlantByName,
};
