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

        const { stockTotal } = game.rows[0]
        const rentals = await connection.query(`SELECT "returnDate" FROM rentals WHERE "returnDate" IS NULL AND "gameId" = $1`, [gameId]);
        if (rentals.rows.length >= stockTotal) {
            return res.sendStatus(400);
        }

    } catch (e) {
        res.sendStatus(500);
    }

    next();
}

export async function closedRentalValidate(req, res, next) {
    const { id } = req.params;

    try {
        const rental = await connection.query('SELECT * FROM rentals WHERE id = $1', [id]);

        if (!rental.rows[0]) {
            return res.sendStatus(404);
        }

        if (rental.rows[0].returnDate !== null) {
            return res.sendStatus(400);
        }

        res.locals.rental = rental;

    } catch (e) {
        res.sendStatus(500);
    }
    
    next();
}