const Mongoose = require('mongoose');
const Validator = require('validatorjs');
const ResponseCodes = require('../middleware/response-code');
const Users_model=require('../models/users.model');
const { v4: uuidv4 } = require('uuid');
var response_code = new ResponseCodes();
var server_status = response_code.serverError().status;
var server_unavailable_status = response_code.serverUnavailable().status;
var data_status = response_code.dataNotFound().status;
var request_status = response_code.badRequest().status;
var access_status = response_code.forbidden().status;
var auth_status = response_code.unauthorized().status;
var success_status = response_code.success().status;

module.exports= {

    /**
     * The above function is used to register a user.
     * @param req - The request object.
     * @param res - The response object.
     */
    register(req,res){
        // #swagger.tags=['Users']
        /*  

            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Add new user.',
                schema: { $ref: '#/requests/AddUser' }
            }            
        */
        let first_name=req.body?.first_name;
        let last_name=req.body?.last_name;
        let email=req.body?.email;
        let phone=req.body?.phone;
        let id=uuidv4();
        
        let data= {
            first_name,
            last_name,
            email,
            phone,
            id
        }
        let rules = {
            first_name:'required|string|min:2',
            last_name:'required|string|min:2',
            email:'required|email',
            phone:'required|string|size:10',
            id:'required|string'
        }
    
        let validation = new Validator(data, rules);
    
        if(!validation.passes()){
            response_code.error = {
                'message':{...validation.errors.errors}
            }
            res.status(request_status).send(response_code.badRequest());
        }else{
            var new_user=new Users_model(data);
            new_user.save().then((result)=>{
                    /* #swagger.responses[200] = {
                        description: 'Create user.',
                        schema: { $ref: '#/definitions/UserCreationSuccessResponse' }
                        } 
                    */
                    response_code.message="User created successfully";
                    response_code.data=result;
                    res.status(success_status).send(response_code.success());
            }).catch((err)=>{
                response_code.error = {
                    'message':{...err}
                }
                res.status(server_status).send(response_code.serverError());
            })
        }
    },

    /**
     * It updates the user's details
     * @param req - The request object.
     * @param res - The response object.
     */
    updateUser(req,res){
        // #swagger.tags=['Users']
        /*  
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Update user.',
                schema: { $ref: '#/requests/UpdateUser' }
            } 
             #swagger.parameters['user_id'] = {
                in: 'params',
                description: 'User Id',
                
            } 
        */
        let first_name=req.body?.first_name;
        let last_name=req.body?.last_name;
        let email=req.body?.email;
        let phone=req.body?.phone;
        let user_id=req.params.user_id;
        
        let data= {
            first_name,
            last_name,
            email,
            phone,
            user_id
        }
        let rules = {
            first_name:'required|string|min:2',
            last_name:'required|string|min:2',
            email:'required|email',
            phone:'required|string|size:10',
            user_id:'required|string'
        }
    
    
        let validation = new Validator(data, rules);
    
        if(!validation.passes()){
            response_code.error = {
                'message':{...validation.errors.errors}
            }
            res.status(request_status).send(response_code.badRequest());
        }else{      
            Users_model.updateOne({$and:[{id:user_id},{deleted_at:{$exists:false}}]},{$set:{
                first_name:first_name,
                last_name:last_name,
                email:email,
                phone:phone
            }},{upsert:true})
            .then((resource)=>{
                response_code.message="User updated successfully";
                response_code.data=resource;
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

    /**
     * It deletes a user from the database.
     * @param req - The request object.
     * @param res - The response object.
     */
    deleteUser(req,res){
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
                user_id:'required|string'
            }
        
            let validation = new Validator(data, rules);
        
            if(!validation.passes()){
                response_code.error = {
                    'message':{...validation.errors.errors}
                }
                res.status(request_status).send(response_code.badRequest());
            }else{      
                Users_model.updateOne({id:user_id},{$set:{deleted_at:new Date()}},{upsert:true})
                .then((user)=>{
                    response_code.message="User deleted successfully";
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