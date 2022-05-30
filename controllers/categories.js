import client from '../db.js'

export const getCategories = async (req, res) => {
    try {

        const query =  await client.query('select * from categories');
        res.send(query)

    } catch (error) { return res.status(500).send(error) }
}

export const postCategories = async (req, res) => {
    try {
        
        const query =  await client.query('insert into categories (name) values ($1)', [req.body.name]);
        res.sendStatus(201)

    } catch (error) { return res.status(500).send(error) }
}