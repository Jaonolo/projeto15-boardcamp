import client from '../db.js'

export const getCategories = async (req, res) => {
    try {

        const query =  await client.query('select * from categories');
        res.send(query.rows)

    } catch (error) { return res.status(500).send(error) }
}

export const postCategories = async (req, res) => {
    try {
        const isThereEqual = (await client.query('select c.name from categories c')).rows.map(e => e.name).includes(req.body.name)
        if (isThereEqual)
            return res.sendStatus(409)
        
        const query =  await client.query('insert into categories (name) values ($1)', [req.body.name]);
        res.sendStatus(201)

    } catch (error) { return res.status(500).send(error) }
}