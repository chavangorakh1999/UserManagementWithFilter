const Mongoose = require('mongoose');;
const ResponseCodes = require('../middleware/response-code');
const Users_model=require('../models/users.model');
const users=require('./users')
var response_code = new ResponseCodes();
var server_status = response_code.serverError().status;
var server_unavailable_status = response_code.serverUnavailable().status;
var data_status = response_code.dataNotFound().status;
var request_status = response_code.badRequest().status;
var access_status = response_code.forbidden().status;
var auth_status = response_code.unauthorized().status;
var success_status = response_code.success().status;


module.exports = {
   async migrateDB(req,res){
        let user_promises=[];
        users.map(async(user)=>{
            let new_user=new Users_model(user);
            let response=await new_user.save();
            user_promises.push(response); 
        })
        Promise.all(user_promises).then((data)=>{
            console.log("Data saved sucessully");
            response_code.message="Data saved sucessully";
            response_code.data=data;
             res.status(success_status).send(response_code.success());
        }).catch((err)=>{
            console.log("Error");
            response_code.message="Error migrating DB, please try again"
            response_code.error=err;
             res.status(server_status).send(response_code.serverError());
        })
    }
}