const mongoose = require('mongoose');

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
       required: true
    },
    password : {
       type : String ,
       required: true 
    },
    age : {
        type : Number,
        min: 18
    },
    gender : {
        type : String,
       validate(value){
        if(!["male","female","others"].includes(value)){
            throw new error('gender is not valid');
        }
       }

    },
    photoUrl : {
        type : String
    },
    about : {
        type : String,
        default : "this is default about of the user"
    }
});

module.exports = mongoose.model('User', userSchema); ;