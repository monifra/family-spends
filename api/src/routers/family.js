//require
const express = require('express');
//set up router
const router = new express.Router();
const Family = require('../models/Family');

/* Handler function to wrap each route. */
function asyncHandler(cb){
    return async(req, res, next) => {
        try {
            await cb(req, res, next)
        } catch(error){
            res.status(500).send(error);
        }
    }
}

//USERS ENDPOINTS

//get families api/families, show all families, status 200
router.get('/families', asyncHandler(async(req,res)=>{
    const families = await Family.find({});
    res.status(200).send(families);
}));

//post family api/families, post new family, status 201 Created
router.post('families', asyncHandler(async(req,res)=>{
    const family = new Family(req.body);
    await family.save();
    res.status(201).send(family);
}));

module.exports = router;