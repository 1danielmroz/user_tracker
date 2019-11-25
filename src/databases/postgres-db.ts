//postgres-db.ts
/*
This file initializes your PostgreSQL database. You need to supply
the host name, username, password and database name for your database.
*/
import { createConnection } from 'typeorm';
import { postgresTables } from './postgres-tables'

export const postgresDB = async () => {
    return await createConnection({
        type     : 'postgres',
        host     : '',
        port     :  5432,
        username : '',
        password : '',
        database : '',
        entities: postgresTables,
        logging: ['query', 'error'],
        synchronize: true,//only true if you want it to automaticly create tables
    }).then((connection) => {
        console.log('Database connection established');

    });
};
