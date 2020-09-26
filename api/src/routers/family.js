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

//get families api/families, show all families, status 200 OK
router.get('/families', asyncHandler(async(req,res)=>{
    const families = await Family.find({});
    res.status(200).send(families);
}));

//get single family by its id, api/families/:id, status 200 OK
router.get('/families/:id', asyncHandler(async(req,res)=>{
    const _id = req.params.id;
    const family = await Family.findById(_id);
    if(!family){
        res.status(404).send({error: 'Family doesn\'t exist'}) ;//show error message when family doesn't exist
    } else {
        res.status(200).send(family);
    }
}));

//post family api/families, post new family, status 201 Created
router.post('/families', asyncHandler(async(req,res)=>{
    const family = new Family(req.body);
    await family.save();
    res.status(201).send(family);
}));

//patch one family api/families/:id, status 200 OK
router.patch('/families/:id', asyncHandler(async(req,res)=>{
    const _id = req.params.id;
    const body = req.body;

    //verify existence in a model
    const updates = Object.keys(body);
    const allowUpdates = ['familyName', 'familyMembers', 'savings'];
    const isValid = updates.every((update)=> allowUpdates.includes(update));

    if(!isValid){
        return res.status(404).send({error: 'Invalid Updates!'});
    }

    const family =  await Family.findByIdAndUpdate(_id, body, {new: true, runValidators: true});
    if(!family){
        res.status(404).send({error: 'Family doesn\'t exist'});
    } else {
        res.status(200).send(family);
    }

}));

//delete one family api/families/:id, status 200 OK
router.delete('/families/:id', asyncHandler(async(req, res)=>{
    const _id = req.params.id;
    const family = await Family.findByIdAndDelete(_id);
    if(!family){
        res.status(404).send({error: 'Family doesn\'t exist'});
    }else{
        res.send({message: family.familyName + ' family was deleted.'});
    }
}));

module.exports = router;