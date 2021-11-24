const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        unique:true
    },
    profilepic: {
        type: String,
        default: ""
    },
}, { timestamps: true }  //timestamps will  be given on creation and updation automatically
);

module.exports=mongoose.model('User',UserSchema) 
//model name is user