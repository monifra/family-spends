//require
const mongoose = require('mongoose');
const chalk = require('chalk');

//THIS INITIALIZE DATABASE AND GETS IT UP AND RUNNING
//To RUN /Users/monikafrankowska/mongodb/bin/mongod --dbpath=/Users/monikafrankowska/mongodb-data
//waiting on connections on port 27017
//Open MongoDB GUI in my case Robo3T
    //opens mongoDB connections panel
        //create new connection: give it a name, set address to localhost and port to 27017
        //now we can test to connection and save it
    //we can test connection by clicking it and choose open shell and write: db.version()
//Connecting and inserting documents
//ps aux | grep -v grep | grep mongod

mongoose
    .connect('mongodb://127.0.0.1:27017/family-spends',{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
})
    .then(() => console.log(chalk.bold.green('Successfully connected to MongoDB!')))
    .catch((err) => console.log(chalk.bold.red('Something went wrong', err)));

//CATCH NOT WORKING