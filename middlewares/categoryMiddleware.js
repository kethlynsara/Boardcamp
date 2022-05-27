import connection  from "../database.js";

export async function categoryMiddleware(req, res, next) {
    const { name } = req.body;
    if (!name) {
        return res.sendStatus(400);
    }
    
    try {
        const { rows } = await connection.query('SELECT * FROM categories WHERE name = $1', [name]);       
        if (rows.length !== 0) {
            return res.sendStatus(409);
        }
    }catch(e) {
        res.sendStatus(500);
    }

    next();
}