import connection  from "../database.js";

export async function categoryMiddleware(req, res, next) {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send('Dados inválidos!');
    }
    
    try {
        const { rows } = await connection.query('SELECT * FROM categories WHERE name = $1', [name]);       
        if (rows.length !== 0) {
            return res.status(409).send('Categoria já cadastrada!');
        }
    }catch(e) {
        res.sendStatus(500);
    }

    next();
}