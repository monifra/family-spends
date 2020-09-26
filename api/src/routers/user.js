//require
const express = require('express');
//set up router
const router = new express.Router();

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


module.exports = router;