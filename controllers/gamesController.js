import connection from '../database.js';

export async function getAllGames(req, res) {
    const { name } = req.query;
    try {
        if (name) {
            const games = await connection.query(`
            SELECT games.*, categories.name as "categoryName"
            FROM games
            JOIN categories ON games."categoryId" = categories.id
            WHERE lower(games.name) LIKE '%${name}%';`);
            res.status(200).send(games.rows);
        } 
        else {
            const allGames = await connection.query(`
            SELECT games.*, categories.name as "categoryName"
            FROM games
            JOIN categories ON games."categoryId" = categories.id;`);
            res.status(200).send(allGames.rows);
        }        
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function addGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    try {
        connection.query(
            `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
             VALUES ($1, $2, $3, $4, $5)`, [name, image, stockTotal, categoryId, pricePerDay]);
             res.sendStatus(201);
    }catch(e) {
        res.sendStatus(500);
    }
}