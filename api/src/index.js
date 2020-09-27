//require
const express = require('express');
require('./db/mongoose');

const userRouter = require('./routers/user');
const familyRouter = require('./routers/family');

const app = express();

//setting port for Heroku or a normal 3000
const port = process.env.PORT || 3000;

app.use(express.json());

//use user router
app.use('/api', userRouter);
app.use('/api', familyRouter);

// setup a greeting for the root route
app.get('/api', (req, res) => {
    res.send({
        message: 'Welcome to the family spends REST API!',
    });
});

// send 404 if no other route matched
app.get('*', (req,res)=>{
    res.status(404).send({message: 'Page Not Found'});
})



app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});