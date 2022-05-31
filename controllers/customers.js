import client from '../db.js'

export const getCustomers = async (req, res) => {
    try {
        const cpf = req.query.cpf || ''
        const query = await client.query(`select * from customers c where c.cpf like $1`, [
            cpf + '%'
        ]);

        res.send(query.rows)

    } catch (error) { return res.status(500).send(JSON.stringify(error)) }
}

export const getCustomerById = async (req, res) => {
    try {
        const query = await client.query(`select * from customers c where c.id=$1`, [
            req.params.id
        ]);

        if(query.rows.length === 0)
            return res.sendStatus(404)

        res.send(query.rows[0])

    } catch (error) { return res.status(500).send(JSON.stringify(error)) }
}

export const postCustomer = async (req, res) => {
    try {
        const isThereEqual = (await client.query('select c.cpf from customers c')).rows.map(e => e.cpf).includes(req.body.cpf)
        if (isThereEqual)
            return res.sendStatus(409)
        
        const query =  await client.query('insert into customers (name, phone, cpf, birthday) values ($1, $2, $3, $4)', [
            req.body.name, req.body.phone, req.body.cpf, req.body.birthday
        ]);
        res.sendStatus(201)

    } catch (error) { return res.status(500).send(error) }
}

export const updateCustomer = async (req, res) => {
    try {
        const verify = await client.query(`select * from customers c where c.id=$1`, [
            req.params.id
        ]);

        if(verify.rows.length === 0)
            return res.sendStatus(404)

        const isThereEqual = (await client.query('select * from customers c where c.id<>$1', [ req.params.id ])).rows.map(e => e.cpf).includes(req.body.cpf)
        if (isThereEqual)
            return res.sendStatus(409)
        
        const query =  await client.query('update customers set name=$1, phone=$2, cpf=$3, birthday=$4 where customers.id=$5', [
            req.body.name, req.body.phone, req.body.cpf, req.body.birthday, req.params.id
        ]);
        res.sendStatus(200)

    } catch (error) { return res.status(500).send(error) }
}