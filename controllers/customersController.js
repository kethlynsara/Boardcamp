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

export async function getCustomer(req, res) {
    const { id } = req.params;

    try {
        const customer = await connection.query('SELECT * FROM customers WHERE id = $1', [id]);
        if (customer.rows.length === 0) {
            return res.sendStatus(404);
        }

        res.status(200).send(customer.rows[0]);
    } catch (e) {
        res.sendStatus(500);
    }
}

export async function postCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    try {
        await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)', [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (e) {
        res.sendStatus(500);
    } 
}