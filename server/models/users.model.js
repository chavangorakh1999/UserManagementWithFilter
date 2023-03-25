const mongoose = require('mongoose')

const Schema=mongoose.Schema;

let schema= new Schema({
    _id:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique:true,
        required: true
    },
    phone:{
        type:String,
        unique:true,
        required:true
    },
    created_at: {
        type: Date,
        default: new Date().toUTCString()
    },
    updated_at: {
        type: Date,
        default: new Date().toUTCString()
    },
    deleted_at: {
        type: Date
    }    
});

const Users = mongoose.model('Users',schema);

module.exports=Users;
