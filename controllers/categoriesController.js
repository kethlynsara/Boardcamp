import connection from '../database.js';

export async function getAllCategories(req, res){
    try {
        const categories = await connection.query('SELECT * FROM categories');
        res.status(200).send(categories.rows);
    }catch(e) {
        res.sendStatus(500);
    }
}

export async function addCategory(req, res) {
    const { name } = req.body;
    try {
        connection.query(`INSERT INTO categories (name) VALUES ($1);`, [name]);
        res.sendStatus(201);
    }catch(e) {
       res.sendStatus(500);
    }
}