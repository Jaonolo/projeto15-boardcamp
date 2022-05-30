import pg from 'pg';

const { Pool } = pg;

const connectionInfo = {
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'meu_banco_de_dados'
};

export default new Pool(connectionInfo);