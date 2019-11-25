

import { postgresDB } from 'databases/postgres-db';
import {restRouter} from 'routes/rest-routes';

import * as bodyParser from 'koa-bodyparser';

var app = require('./app');
const bootstrap = async () => {
    // Initialize the database
    await postgresDB();
    app.use(bodyParser());
    app.use(restRouter.routes(), restRouter.allowedMethods())
    
    //Tell the app to listen on port 3000
    app.listen(3000);
};
bootstrap();
