//require
const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
require('./db/mongoose');

const userRouter = require('./routers/user');
const familyRouter = require('./routers/family');

const app = express();

//setting port for Heroku or a normal 3000
const port = process.env.PORT || 3000;

// Enable all CORS Requests
app.use(cors());

app.use(express.json());

//use user router
app.use('/api', userRouter);
app.use('/api', familyRouter);

//redirect from '/' to '/api'
app.get('/',(req,res)=>{
    res.redirect('/api')
});

// setup a greeting for the API root route
app.get('/api', (req, res) => {
    res.send({
        message: 'Welcome to the family spends REST API!',
    });
});

// send 404 if no other route matched
app.get('*', (req,res)=>{
    res.status(404).send({error: 'Page Not Found'});
})



app.listen(port, () => {
    console.log(chalk.bold.inverse.green(`API server is up on port: ${port}`));
});