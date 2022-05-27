import connection from '../database.js';

export async function getAllCategories(req, res){
    try {
        const categories = await connection.query('SELECT * FROM categories');
        res.status(200).send(categories.rows);
    }catch(e) {
        res.sendStatus(500);
    }
}