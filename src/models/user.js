const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
        
    },
    lastName : {
        type : String,
        required: true
    },
    emailId : {
       type : String ,
       required: true,
       validate(value){
       if(!validator.isEmail(value)){
       throw new Error ('Invalid Email address:' + value)
    }}
},
    password : {
       type : String ,
       required: true ,
        validate(value){
       if(!validator.isStrongPassword(value)){
       throw new Error ('Enter strong password:' + value)
    }},
    },
    age : {
        type : Number,
        min: 18
    },
    gender : {
        type : String,
       validate(value){
        if(!["male","female","others"].includes(value)){
            throw new Error('gender is not valid');
        }
       }

    },
    photoUrl : {
        type : String,
        validate(value){
       if(!validator.isURL(value)){
       throw new Error ('Invalid UrL:' + value)
    }}
    },
    about : {
        type : String,
        default : "this is default about of the user"
    },
    skills : {
        type : [String]
    }
}, {timestamps : true});

module.exports = mongoose.model('User', userSchema);