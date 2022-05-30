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
    const date = dayjs().format("YYYY-MM-DD");
    const originalPrice = daysRented * pricePerDay;
    try {
        await connection.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
                                VALUES ($1, $2, $3, $4, $5, $6, $7)`, [customerId, gameId, `${date}`, daysRented, null, originalPrice, null]);
        res.sendStatus(201);
    } catch (e) {
        return res.sendStatus(500);
    }
}

export async function closeRental(req, res) {
    const { id } = req.params;
    const { rental } = res.locals;
    const { daysRented, rentDate } = rental.rows[0];

    const newRentDate = new Date(rentDate);
    const getDeliveryDate = newRentDate.setDate(newRentDate.getDate() + parseInt(daysRented));    
    const deliveryDate = new Date(getDeliveryDate);     
    const todayDate = new Date(dayjs().format("YYYY-MM-DD"));
    let delayDays = 0;

    if (todayDate > deliveryDate) {
        const difference = Math.abs(deliveryDate - todayDate);
        delayDays = parseInt(difference/(1000 * 3600 * 24));
    } 

    try {
        const game = await connection.query('SELECT * FROM games WHERE id = $1', [rental.rows[0].gameId]);
        const pricePerDay = game.rows[0].pricePerDay * delayDays;
        await connection.query(`
        UPDATE rentals
        SET
            "returnDate" = $1,
            "delayFee" = $2
        WHERE id = $3
        `, [dayjs().format("YYYY-MM-DD"), pricePerDay, rental.rows[0].id]);
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
}

export async function deleteRental(req, res) {
    const { id } = req.params;
    const { rental } = res.locals;

    try {
        await connection.query('DELETE FROM rentals WHERE id = $1', [rental.rows[0].id]);
        res.sendStatus(200);
    }catch(e) {
        console.log(e);
    }
}