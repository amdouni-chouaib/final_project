const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique:false,
        required: true,
    },
    category: {
        type: Array
    },
    photo: {
        type: String,
        default: ""
    },
}, { timestamps: true }  //timestamps will  be given on creation and updation automatically
);

const post=mongoose.model('Post',PostSchema) 
//model name is post

module.exports=post