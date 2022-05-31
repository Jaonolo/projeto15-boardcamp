import client from '../db.js'

export const getGames = async (req, res) => {
    try {
        const qname = req.query.name || ''
        const query =  await client.query(`select g.*, c.name as "categoryName" from games g join categories c on g."categoryId"=c.id where g.name like $1`, [
            qname + '%'
        ]);

        res.send(query.rows)

    } catch (error) { return res.status(500).send(JSON.stringify(error)) }
}

export const postGames = async (req, res) => {
    try {
        const categoryExist = (await client.query('select c.id from categories c')).rows.map(e => e.id).includes(req.body.categoryId)
        if (!categoryExist)
            return res.sendStatus(400)

        const isThereEqual = (await client.query('select g.name from games g')).rows.map(e => e.name).includes(req.body.name)
        if (isThereEqual)
            return res.sendStatus(409)
        
        const query =  await client.query(`insert into games (name,image,"stockTotal","categoryId","pricePerDay") values ($1,$2,$3,$4,$5)`, [
            req.body.name, req.body.image, req.body.stockTotal, req.body.categoryId, req.body.pricePerDay
        ]);
        res.sendStatus(201)

    } catch (error) { return res.status(500).send(JSON.stringify(error)) }
}