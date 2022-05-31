import client from '../db.js'
import dayjs from 'dayjs';

export const getRentals = async (req, res) => {
    try {
        const query = await client.query(`
            select 
                r.*,
                c.name as "customerName",
                g.name as "gameName",
                g."categoryId",
                cg.name as "categoryName"
            from rentals r
            join customers c
            on r."customerId"=c.id
            join games g
            on r."gameId"=g.id
            join categories cg
            on g."categoryId"=cg.id
        `);

        let formattedResult = query.rows.map(e => {
            const deletedE = {...e}
            delete deletedE.customerName
            delete deletedE.gameName
            delete deletedE.categoryId
            delete deletedE.categoryName
            
            return {
                ...deletedE,
                customer: {
                    id: e.customerId,
                    name: e.customerName
                },
                game: {
                    id: e.gameId,
                    name: e.gameName,
                    categoryId: e.categoryId,
                    categoryName: e.categoryName
                }
            }
        })

        if (req.query.customerId)
            formattedResult = formattedResult.filter(e => e.customer.id === 1*req.query.customerId)
        if (req.query.gameId)
            formattedResult = formattedResult.filter(e => e.game.id === 1*req.query.gameId)

        res.send(formattedResult)

    } catch (error) { return res.status(500).send(JSON.stringify(error)) }
}

export const postRentals = async (req, res) => {
    try {
        const customer = (await client.query(`select * from customers c where c.id=$1`, [ req.body.customerId ])).rows[0]
        if(!customer)
            return res.sendStatus(400)

        const game = (await client.query(`select * from games g where g.id=$1`, [ req.body.gameId ])).rows[0]
        if(!game)
            return res.sendStatus(400)

        const isGameAvailable = (await client.query(`
            select * from rentals r 
            where r."gameId"=$1 and (r."returnDate" IS NULL)
        `, [ req.body.gameId ] )).rows.length < game.stockTotal
        if (!isGameAvailable)
            return res.sendStatus(400)

        const { pricePerDay } = game
        const query =  await client.query('insert into rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") values ($1,$2,$3,$4,$5,$6,$7)', [
            req.body.customerId,
            req.body.gameId,
            dayjs().format('YYYY-MM-DD'),
            req.body.daysRented,
            null,
            pricePerDay*req.body.daysRented,
            null
        ]);
        res.sendStatus(201)

    } catch (error) { return res.status(500).send(error) }
}

export const returnRental = async (req, res) => {
    try {
        const rentals = await client.query(`select * from rentals r where r.id=$1`, [
            req.params.id
        ]);

        if(rentals.rows.length === 0)
            return res.sendStatus(404)

        if(rentals.rows[0].returnDate)
            return res.sendStatus(400)

        const calculateFee = async () => {
            const rental = rentals.rows[0]
            const game = (await client.query(`select * from games g where g.id=$1`, [ rental.gameId ])).rows[0]
            if(!game)
                return res.sendStatus(400)

            const rawValue = (dayjs().diff(dayjs(rental.rentDate), 'days') - rental.daysRented)*game.pricePerDay
            
            return rawValue > 0 ? rawValue : 0
        }

        const fee = await calculateFee()
        const query =  await client.query('update rentals r set "returnDate"=$1, "delayFee"=$2 where r.id=$3', [
            dayjs().format('YYYY-MM-DD'), fee , req.params.id
        ]);
        res.sendStatus(200)

    } catch (error) { return res.status(500).send(JSON.stringify(error)) }
}

export const deleteRental = async (req, res) => {
    try {
        const rentals = await client.query(`select * from rentals r where r.id=$1`, [
            req.params.id
        ]);

        if(rentals.rows.length === 0)
            return res.sendStatus(404)

        if(!(rentals.rows[0].returnDate))
            return res.sendStatus(400)

        const query =  await client.query('delete from rentals r where r.id=$1', [
            req.params.id
        ]);
        res.sendStatus(200)

    } catch (error) { return res.status(500).send(error) }
}