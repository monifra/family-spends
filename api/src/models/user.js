const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

//USER SCHEMA
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    familyName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            //checking if email is formatted correctly
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot include word \'password\'');
            }
        }
    }
});

//CRETE MODEL FROM SCHEMA
const User = mongoose.model('User', userSchema, 'users');
//Export User Model
module.exports = User;



