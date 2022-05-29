import connection from '../database.js';

export async function rentalValidate(req, res, next) {
    const { customerId, gameId, daysRented } = req.body;

    try {
        const customer = await connection.query('SELECT * FROM customers WHERE id = $1', [customerId]);
        const game = await connection.query('SELECT * FROM games WHERE id = $1', [gameId]);

        if (!customer.rows[0] || !game.rows[0] || daysRented <= 0) {
            return res.sendStatus(400);
        }

        res.locals.pricePerDay = game.rows[0].pricePerDay;
    } catch (e) {
        res.sendStatus(500);
    }

    next();
}