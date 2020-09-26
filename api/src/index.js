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
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the family spends REST API!',
    });
});

// send 404 if no other route matched
// setup a global error handler


app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});