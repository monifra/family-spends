//require packages
const express = require('express');
const chalk = require('chalk');
//require functions
const familySingle = require('./utils/singleFamily')
const families = require('./utils/families');

const app = express();
const port = process.env.PORT || 4000;

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

//START page
app.get('/', asyncHandler(async(req, res)=>{
    res.send({
        message: 'Welcome to the family spends frontend!',
    });
}));

//USER PROFILE page, add expenses
app.get('/user/:id', (req, res)=>{
    res.send({
        message: 'Welcome expenses page!',
    });
});

//ADMINISTRATOR PROFILE page, all families
app.get('/families', asyncHandler(async(req,res)=>{

    families((err, familiesData)=>{
        if(err){
            console.log('Error:', err);
        }
        if(familiesData){
            console.log('Data:', familiesData);
        }
    });

}));

//ADMINISTRATOR PROFILE page, single family
app.get('/families/:id', asyncHandler(async(req,res)=>{

}));


familySingle('5f6f328a33ced1c816a037c8', (err, familyData)=>{
    if(err){
        console.log('Error:', err);
    }
    if(familyData){
        console.log('Data:', familyData);
    }
});

app.listen(port, () => {
    console.log(chalk.bold.inverse.cyan(`Server is up on port: ${port}`));
});




