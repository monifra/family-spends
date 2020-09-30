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

    users((err, usersData)=>{
        if(err){
            return console.log(err);
        }
        if(usersData){
            console.log(usersData);



            res.render('index',{
                title: 'Family Finances'
            });
        }
    });


}));

//USER PROFILE page, add expenses
app.get('/users/:id', (req, res)=>{
    const _id = req.params.id;
    familySingle(_id, (err, familyData)=>{
        if(err){
            res.send({'Error:': err});
        }
        if(familyData){
            const family = JSON.parse(familyData);
            res.render('userPanel', {
                familyName: family.familyName,
                familyMembers: family.familyMembers,
                savings: family.savings,
                familyId: _id
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
            res.render('familiesTable', {families : families});
        }
    });


}));

//ADMINISTRATOR PROFILE GET page, single family
app.get('/families/:id', asyncHandler(async(req,res)=>{
    const _id = req.params.id;
    familySingle(_id, (err, familyData)=>{
        if(err){
            res.send({'Error:': err});
        }
        if(familyData){

            const family = JSON.parse(familyData);
            res.render('adminPanel', {
                familyName: family.familyName,
                familyMembers: family.familyMembers,
                savings: family.savings,
                familyId: _id
            });
        }
    });
}));

// //PART FOR UPDATING DATA!!!!
// app.use(bodyParser.urlencoded({ extended: false }));
//
// app.get('/', (req,res)=>{
//     res.sendFile(path.join(__dirname, '../templates/views/adminPanel.hbs'));
// });
//
// //ADMINISTRATOR PROFILE UPDATE family page after submit a button
// app.post('/families/:id', asyncHandler(async(req,res)=>{
//     const _id = req.params.id;
//     const url = 'http://localhost:3000/api/families/:id';
//     const postBody = req.body;
//     console.log(postBody + 'this is me');
//     // const options = ;
//     // request.post(url,);
// }));

app.get('/families/*', (req,res)=>{
    //render error page!! 404 for family not found
});

app.get('*', (req,res)=>{
    //render error page!! 404 Page not found
});

app.listen(port, () => {
    console.log(chalk.bold.inverse.cyan(`Server is up on port: ${port}`));
});




