//require
const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

//FAMILY SCHEMA
const familySchema = new Schema({
    familyName: {
        type: String,
        required: true,
        trim: true
    },
    familyMembers: {
        type: Array,
        required: true,
    },
    savings: {
        type: Number,
        default: 1000,
        validate(value){
            if(value < 0){
                throw new Error('Savings must be a positive number');
            }
        }
    }
});

//CRETE MODEL FROM SCHEMA
const Family = mongoose.model('Family', familySchema, 'families');
//Export User Model
module.exports = Family;