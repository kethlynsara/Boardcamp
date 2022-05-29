import connection from '../database.js';

export async function getAllCustomers(req, res) {
    const { cpf } = req.query;
    try {
        if (cpf) {
            const customers = await connection.query(`
            SELECT * FROM customers WHERE cpf LIKE '${cpf}%';`);
            res.status(200).send(customers.rows);
        } else {
            const allCustomers = await connection.query('SELECT * FROM customers');
            res.status(200).send(allCustomers.rows);
        }      
    } catch (error) {
        res.sendStatus(500);
    }
}