//File for initial seed of family spends database
//require
const mongoose = require('mongoose');
const User = require('../models/User');
const Family = require('../models/Family');
const chalk = require('chalk');

//make a connection
mongoose
    .connect('mongodb://127.0.0.1:27017/family-spends',{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
})
    .then(() => console.log(chalk.bold.green('Successfully connected to MongoDB!')))
    .catch((err) => console.log(chalk.bold.red('Something went wrong', err)));

//To drop an existing collection
// User.collection.drop();
// Family.collection.drop();

const userOla = new User({
    name: 'Ola',
    familyName: 'A',
    email: 'ola@a.com',
    password: 'Korona.2020'
});
const userAdam = new User({
    name: 'Adam',
    familyName: 'A',
    email: 'adam@a.com',
    password: 'Tree.2020'
});
const userKinga = new User({
    name: 'Kinga',
    familyName: 'A',
    email: 'kinga@a.com',
    password: 'Christmas.2020'
});

const family1 = new Family({
    familyName: 'A',
    familyMembers: ['Ola', 'Adam', 'Kinga'],
});

const saveNew = (entry) => {
    entry.save().then(()=>{
        console.log(entry);
    }).catch((err)=>{
        console.error('Error!', err)
    })
}

saveNew(userOla);
saveNew(userAdam);
saveNew(userKinga);
saveNew(family1);