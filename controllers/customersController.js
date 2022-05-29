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
    const { body } = res.locals;
    const { name, phone, cpf, birthday } = body;
    try {
        await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)', [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (e) {
        res.sendStatus(500);
    } 
}

export async function putCustomer(req, res) {
    const { id } = req.params;
    const { body } = res.locals;

    try {
        const query = `
        UPDATE customers 
        SET 
           name = $1,
           phone = $2,
           cpf = $3,
           birthday = $4
        WHERE id = $5`;

        const values = [body.name, body.phone, body.cpf, body.birthday, id];
        await connection.query(query, values);
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    } 
}