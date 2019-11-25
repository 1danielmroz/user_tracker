

import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { Users_Visits } from 'models/uservisits';


export default class Users_Visits_Controller {

  //get all users
    public static async getUsers (ctx: BaseContext) {
        // get a user repository to perform operations with user
        const userRepository: Repository<Users_Visits> = getManager().getRepository(Users_Visits);
        // load all users
        const users_visits: Users_Visits[] = await userRepository.find();
        // return OK status code and loaded users array
        ctx.status = 200;
        ctx.body = users_visits;
    }

//Get user by id
    public static async getUser (ctx: BaseContext) {
    // get a user repository to perform operations with user
    const userRepository: Repository<Users_Visits> = getManager().getRepository(Users_Visits);
    // load user by id
    const user: Users_Visits = await userRepository.findOne(ctx.params.id);
    if (user) {
        // return OK status code and loaded user object
        ctx.status = 200;
        ctx.body = user;
    } else {
        // return a BAD REQUEST status code and error message
        ctx.status = 400;
        ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
      }
    }

//Create user
    public static async createUser (ctx: BaseContext) {
        // get a user repository to perform operations with user
        const userRepository: Repository<Users_Visits> = getManager().getRepository(Users_Visits);

        // build up entity user to be saved
        const userToBeSaved: Users_Visits = new Users_Visits();
        console.log(ctx.request)
        console.log(ctx.request.body)
        userToBeSaved.browser = ctx.request.body.browser;
        userToBeSaved.domain = ctx.request.body.domain;
        userToBeSaved.height = ctx.request.body.height;
        userToBeSaved.width = ctx.request.body.width;
        userToBeSaved.userIP = ctx.request.body.userIP;
        userToBeSaved.is_mobile = ctx.request.body.is_mobile;
        userToBeSaved.log_time = ctx.request.body.log_time;
        userToBeSaved.log_time_raw = ctx.request.body.log_time_raw;
        userToBeSaved.leave_time = ctx.request.body.leave_time;
        userToBeSaved.leave_time_raw = ctx.request.body.leave_time_raw;
        //validate(ctx.request.body.name);
        // validate user entity
        const errors: ValidationError[] = await validate(userToBeSaved, { skipMissingProperties: true }); // errors is an array of validation errors
        if (errors.length > 0) {
            // return BAD REQUEST status code and errors array
            ctx.status = 400;
            ctx.body = errors;
        } else {
            // save the user contained in the POST body
            const user = await userRepository.save(userToBeSaved);
            // return CREATED status code and updated user
            ctx.status = 201;
            ctx.body = user;
        }
    }

//Delete user
public static async deleteUser (ctx: BaseContext) {
    // get a user repository to perform operations with user
    const userRepository: Repository<Users_Visits> = getManager().getRepository(Users_Visits);
    // load the user by id
    const userToRemove: Users_Visits = await userRepository.findOne(ctx.params.id);
    if (!userToRemove) {
        // return a BAD REQUEST status code and error message
        ctx.status = 400;
        ctx.body = 'The user you are trying to delete doesn\'t exist in the db';
    } else {
        // the user is there so can be removed
        await userRepository.remove(userToRemove);
        // return a NO CONTENT status code
        ctx.status = 204;
    }
}

//Update user

public static async updateUser (ctx: BaseContext) {
    // get a user repository to perform operations with user
    const userRepository: Repository<Users_Visits> = getManager().getRepository(Users_Visits);
    // load the user by id
    const userToBeUpdated: Users_Visits = await userRepository.findOne(ctx.params.id_sesion);
    // return a BAD REQUEST status code and error message if the user cannot be found
    if (!userToBeUpdated) {

        ctx.status = 400;
        ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
    }
    if(ctx.request.body.browser) {userToBeUpdated.browser = ctx.request.body.browser;}
    if(ctx.request.body.domain) {userToBeUpdated.domain = ctx.request.body.domain;}
    if(ctx.request.body.height) {userToBeUpdated.height = ctx.request.body.height;}
    if(ctx.request.body.width) {userToBeUpdated.width = ctx.request.body.width;}
    if(ctx.request.body.userIP) {userToBeUpdated.userIP = ctx.request.body.userIP;}
    if(ctx.request.body.is_mobile) {userToBeUpdated.is_mobile = ctx.request.body.is_mobile;}
    if(ctx.request.body.log_time) {userToBeUpdated.log_time = ctx.request.body.log_time;}
    if(ctx.request.body.log_time_raw) {userToBeUpdated.log_time_raw = ctx.request.body.log_time_raw;}
    if(ctx.request.body.leave_time) {userToBeUpdated.leave_time = ctx.request.body.leave_time;}
    if(ctx.request.body.leave_time_raw) {userToBeUpdated.leave_time_raw = ctx.request.body.leave_time_raw;}

    const errors: ValidationError[] = await validate(userToBeUpdated); // errors is an array of validation errors
    if (errors.length > 0) {
        // return BAD REQUEST status code and errors array
        ctx.status = 400;
        ctx.body = errors;
    } else if ( !await userRepository.findOne(userToBeUpdated.id_sesion) ) {
        // check if a user with the specified id exists
        // return a BAD REQUEST status code and error message
        ctx.status = 400;
        ctx.body = 'The user you are trying to update doesn\'t exist in the db';
    } else {
        // save the user contained in the PUT body
        const user = await userRepository.save(userToBeUpdated);
        // return CREATED status code and updated user
        ctx.status = 201;
        ctx.body = user;
    }
}


}
