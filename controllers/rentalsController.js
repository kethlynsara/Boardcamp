import dayjs from 'dayjs';

import connection from '../database.js';

export async function getAllRentals(req, res) {
    const { customerId, gameId } = req.query;

    try {
        let getRentals = null;
        if (customerId) {
            getRentals = await connection.query(`
            SELECT rentals.*, customers.name as "customerName", games.name as "gameName", games."categoryId", categories.name as "categoryName"
            FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON games.id = rentals."gameId"
            JOIN categories ON categories.id = games."categoryId"
            WHERE rentals."customerId" = $1 
            `, [customerId]);    
        } else if (gameId) {
            getRentals = await connection.query(`
            SELECT rentals.*, customers.name as "customerName", games.name as "gameName", games."categoryId", categories.name as "categoryName"
            FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON games.id = rentals."gameId"
            JOIN categories ON categories.id = games."categoryId"
            WHERE rentals."gameId" = $1 
            `, [gameId]);    
        } else {
            getRentals = await connection.query(`
            SELECT rentals.*, customers.name as "customerName", games.name as "gameName", games."categoryId", categories.name as "categoryName"
            FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON games.id = rentals."gameId"
            JOIN categories ON categories.id = games."categoryId"
            `);
        }

        const rentals = getRentals.rows;

        const sendRentals = [];

        for (let rental of rentals) {
            rental = {
                ...rental,
                customer: {
                    id: rental.customerId,
                    name: rental.customerName
                },
                game: {
                    id: rental.gameId,
                    name: rental.gameName,
                    categoryId: rental.categoryId,
                    categoryName: rental.categoryName
                }
            }
            delete rental.customerName;
            delete rental.gameName;
            delete rental.categoryId
            delete rental.categoryName
            sendRentals.push(rental);        
        }
        res.status(200).send(sendRentals);
    } catch (e) {
        res.sendStatus(500);
    }
}

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