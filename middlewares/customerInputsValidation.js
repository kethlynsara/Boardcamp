import connection from '../database.js';
import { inputsSchema } from '../schemas/postAndPutInputsSchema.js';

export async function inputsValidate(req, res, next) {
    const { body } = req;

    const validation = inputsSchema.validate(body);

    if (validation.error) {
        console.log(validation.error);
        const response = validation.error.details.map(detail => {return detail})
        return res.status(400).send(response);
    }

    try {
        const customer = await connection.query('SELECT * FROM customers WHERE cpf = $1', [body.cpf]);
        if (customer.rows.length !== 0) {
            return res.sendStatus(409);
        }
    } catch (e) {
        res.sendStatus(500);
    }
    res.locals.body = body;
    next();
}