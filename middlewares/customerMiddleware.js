import connection from '../database.js';
import { inputsSchema } from '../schemas/postAndPutInputsSchema.js';

export async function inputsValidate(req, res, next) {
    const { id } = req.params;
    const { body } = req;
    
    const birthday = body.birthday.slice(0,10);
    const inputs = {...body, birthday: birthday}
    const validation = inputsSchema.validate(inputs);

    if (validation.error) {
        console.log(validation.error);
        const response = validation.error.details.map(detail => {return detail})
        return res.status(400).send(response);
    }

    try {
        const customer = await connection.query('SELECT * FROM customers WHERE cpf = $1 AND id != $2', [body.cpf, id]);
        if (customer.rows.length !== 0) {
            return res.status(409).send('CPF já cadastrado!');
        }
    } catch (e) {
        res.sendStatus(500);
    }
    res.locals.body = body;
    next();
}