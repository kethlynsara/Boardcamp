import dayjs from 'dayjs';

import connection from '../database.js';

export async function postRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const { pricePerDay } = res.locals;
    const date = dayjs(). format("YYYY-MM-DD");
    const originalPrice = daysRented * pricePerDay;
    try {
        await connection.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
                                VALUES ($1, $2, $3, $4, $5, $6, $7)`, [customerId, gameId, `${date}`, daysRented, null, originalPrice, null]);
        res.sendStatus(201);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}