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
    //HERE WILL GO LOGIN SETUP NOW ITS STARTING DEMO PANEL
    families((err, familiesData)=>{
        if(err){
            res.send({'Error':err});
        }
        if(familiesData){
            const families = JSON.parse(familiesData);
            const firstFamily = families[0];
            const firstFamilyId = Object.values(firstFamily)[2];
            res.render('index',{
                title: 'Family Finances',
                familyId: firstFamilyId
            });
        }
    });
}));

//USER PROFILE page, add expenses
app.get('/users/:id', (req, res)=>{
    const _id = req.params.id;
    familySingle(_id, (err, familyData)=>{
        if(err){
            res.render('error', {
                error: err,
                status: 404,
                backPath: '/'
            });
        } else if(_id.length < 24 || _id.length > 24){
            res.render('error', {
                error: 'Family Page Not Found',
                status: 404,
                backPath: '/'
            });
        } else if(familyData){
            const family = JSON.parse(familyData);
            res.render('userPanel', {
                familyName: family.familyName,
                familyMembers: family.familyMembers,
                savings: family.savings,
                familyId: _id,
                name: 'User'
            });
        }
    });
});



//ADMINISTRATOR PROFILE page, all families
app.get('/families', asyncHandler(async(req,res)=>{

    families((err, familiesData)=>{
        if(err){
            res.send({'Error':err});
        }
        if(familiesData){
            const families = JSON.parse(familiesData);
            res.render('familiesTable', {
                families : families,
                name: 'Admin'
            });
        }
    });


}));

//ADMINISTRATOR PROFILE GET page, single family
app.get('/families/:id', asyncHandler(async(req,res,next)=>{
    const _id = req.params.id;
    familySingle(_id, (err, familyData)=>{
        if(err){
            res.render('error', {
                error: err,
                status: 404,
                backPath: '/families'
            });
        }
        else if(_id.length < 24 || _id.length > 24){
            res.render('error', {
                error: 'Family Page Not Found',
                status: 404,
                backPath: '/families'
            });
        }
        else if(familyData){
            const family = JSON.parse(familyData);
            res.render('adminPanel', {
                familyName: family.familyName,
                familyMembers: family.familyMembers,
                savings: family.savings,
                familyId: _id,
                name: 'Admin'
            });
        }
    });
}));

//Error page for page not found status 404
app.get('*', (req,res)=>{
    res.render('error', {
        error: 'Page Not Found',
        status: 404
    });
});

app.listen(port, () => {
    console.log(chalk.bold.inverse.cyan(`Server is up on port: ${port}`));
});




