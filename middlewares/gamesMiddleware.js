import connection from "../database.js";

export async function gamesMiddleware(req, res, next) {
    const { name, stockTotal, categoryId, pricePerDay } = req.body;
    try {
        const { rows } = await connection.query('SELECT * FROM categories WHERE id = $1', [categoryId]);
        if (!name || stockTotal <= 0 || pricePerDay <= 0 || rows.length === 0) {
            return res.sendStatus(400);
        } 

        const gameName = await connection.query('SELECT * FROM games WHERE name = $1', [name]);
        if (gameName.rows.length !== 0) {
            return res.sendStatus(409);
        }
    }catch(e) {
        res.sendStatus(500);
    }

    next();
}