const Mongoose = require('mongoose');
const Validator = require('validatorjs');
const Users_model=require('../models/users.model')
const ResponseCodes = require('../middleware/response-code');
var response_code = new ResponseCodes();
var server_status = response_code.serverError().status;
var server_unavailable_status = response_code.serverUnavailable().status;
var data_status = response_code.dataNotFound().status;
var request_status = response_code.badRequest().status;
var access_status = response_code.forbidden().status;
var auth_status = response_code.unauthorized().status;
var success_status = response_code.success().status;

module.exports= {

    readUsers(req,res){
        // #swagger.tags=['Users']

        const filters=req.query;

        let data= {
            filters
        }
        let rules = {
            filters:'required'
        }
    
        let validation = new Validator(data, rules);
    
        if(!validation.passes()){
            response_code.error = {
                'message':{...validation.errors.errors}
            }
            res.status(request_status).send(response_code.badRequest());
        }else{
            Users_model.find({deleted_at:{$exists:false}})
                .then((users)=>{
                    const filtered_user=users.filter(user=>{
                        let isValid = true;
                        for(key in filters){
                            isValid = isValid && user[key].toLowerCase() == filters[key].toLowerCase();
                        }
                        return isValid;
                    });
                    response_code.message="Users fetched successfully";
                    response_code.data=filtered_user;
                    res.status(success_status).send(response_code.success());
                })
                .catch((err)=>{
                    response_code.error = {
                        'message':{...err}
                    }
                    res.status(server_status).send(response_code.serverError());
                })
        }
        
    },
    getUserById(req,res){
        // #swagger.tags=['Users']
        /*  #swagger.parameters['user_id'] = {
            in: 'params',
            description: 'User Id',
            
        } */
        let user_id=req.params?.user_id;

        let data= {
            user_id
        }
        let rules = {
            user_id:'required|alpha_num'
        }
    
        let validation = new Validator(data, rules);
    
        if(!validation.passes()){
            response_code.error = {
                'message':{...validation.errors.errors}
            }
            res.status(request_status).send(response_code.badRequest());
        }else{
            Users_model.findById(user_id)
                .then((user)=>{
                    response_code.message="User fetched successfully";
                    response_code.data=user;
                    res.status(success_status).send(response_code.success());
                })
                .catch((err)=>{
                    response_code.error = {
                        'message':{...err}
                    }
                    res.status(server_status).send(response_code.serverError());
                })
        }
        
    }
}