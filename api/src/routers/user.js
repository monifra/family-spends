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

//post user api/users, post new user, status 201 Created
router.post('/users', asyncHandler(async(req,res)=>{
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
}));

//patch one user api/users/:id, status 200 OK
router.patch('/users/:id', asyncHandler(async(req,res)=>{
    const _id = req.params.id;
    const body = req.body;

    //verify existence in a model
    const updates = Object.keys(body);
    const allowUpdates = ['name', 'familyName', 'email', 'password'];
    const isValid = updates.every((update)=> allowUpdates.includes(update));

    if(!isValid){
        return res.status(404).send({error: 'Invalid Updates!'});
    }

    const user =  await User.findByIdAndUpdate(_id, body, {new: true, runValidators: true});
    if(!user){
        res.status(404).send({error: 'User doesn\'t exist'});
    } else {
        res.status(200).send(user);
    }

}));
//TO TEST
//delete one user api/users/:id, status 200 OK
router.delete('/users/:id', asyncHandler(async(req, res)=>{
    const _id = req.params.id;
    const user = await User.findByIdAndDelete(_id);
    if(!user){
        res.status(404).send({error: 'User doesn\'t exist'});
    }else{
        res.send({message: user.name + ' ' + user.familyName + ' was deleted.'});
    }
}));

module.exports = router;