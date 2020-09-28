//require packages
const express = require('express');
const path = require('path');
const chalk = require('chalk');
const hbs = require('hbs');

//require functions
const familySingle = require('./utils/singleFamily')
const families = require('./utils/families');
const users = require('./utils/users');

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

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

//set up static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

//set up handlebars
app.set('view engine', 'hbs');

//set up templates folder with another name
app.set('views', path.join(__dirname, '../templates/views'));

//set up partials location
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

//START page
app.get('/', asyncHandler(async(req, res)=>{
    res.render('index',{
        title: 'Family Spends'
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
            res.send(err);
        }
        if(familiesData){
            const families = JSON.parse(familiesData);
            res.send(families);
        }
    });


}));

//ADMINISTRATOR PROFILE page, single family
app.get('/families/:id', asyncHandler(async(req,res)=>{
    const _id = req.params.id;
    familySingle(_id, (err, familyData)=>{
        if(err){
            console.log('Error:', err);
        }
        if(familyData){
            const family = JSON.parse(familyData)
            res.send(family);
        }
    });
}));


users((err, usersData)=>{
    if(err){
        console.log(err);
    }
    if(usersData){
        // const families = JSON.parse(familiesData);
        console.log(usersData);
    }
});

app.listen(port, () => {
    console.log(chalk.bold.inverse.cyan(`Server is up on port: ${port}`));
});




