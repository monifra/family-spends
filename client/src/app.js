//file for routing
const request = require('postman-request');

const familyURL = 'http://localhost:3000/api/families';
const familySingleURL = 'http://localhost:3000/api/families/5f6f328a33ced1c816a037c8';


request({url: familyURL}, (err,res)=>{
    if(err){
        console.log('Unable to connect to family spends api');
    } else {
        const body = JSON.parse(res.body);
        const bodyError = body.error;

        if(bodyError === 'Page Not Found'){
            console.log(bodyError);
            console.log('statusCode:', res && res.statusCode);
        }else{
            console.log(res.body);
            console.log('statusCode:', res && res.statusCode);
        }
    }
});

request({url: familySingleURL}, (err,res)=> {
    if (err) {
        console.log('Unable to connect to family spends api');
    } else {
        const body = JSON.parse(res.body);
        const bodyError = body.error;

        if (bodyError === 'Family doesn\'t exist') {
            console.log(bodyError);
            console.log('statusCode:', res && res.statusCode);
        } else {
            console.log(res.body);
            console.log('statusCode:', res && res.statusCode);
        }
    }
});
