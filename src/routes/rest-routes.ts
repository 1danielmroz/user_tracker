

import * as Router from 'koa-router';
import controller = require('controllers');
export const restRouter = new Router();


//Routes for the user entity
restRouter.get('/users_visits', controller.users_visits.getUsers);
restRouter.get('/users_visits:id', controller.users_visits.getUser);
restRouter.post('/users_visits', controller.users_visits.createUser);
restRouter.put('/users_visits:id', controller.users_visits.getUsers);
restRouter.delete('/users_visits/:id', controller.users_visits.getUsers);
