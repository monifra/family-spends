//require
const express = require('express');
//set up router
const router = new express.Router();
const User = require('../models/User');

/* Handler function to wrap each route. */
function asyncHandler(callbackF){
    return async(req, res, next) => {
        try {
            await callbackF(req, res, next)
        } catch(error){
            res.status(500).send(error);
        }
    }
}

//FAMILY ENDPOINTS

//get users api/users, show all users, status 200
router.get('/users', asyncHandler(async(req,res)=>{
    const users = await User.find({});
    res.status(200).send(users);
}));

//post

module.exports = router;