//Function written with materials from course: https://www.udemy.com/course/the-complete-nodejs-developer-course-2/
const request = require('postman-request');

const families = (cb)=> {
    //url to families list in api
    const url = 'http://localhost:3000/api/families';

    request({url: url}, (err,res)=>{
        if(err){
            cb('Unable to connect to family spends api', undefined);
        } else {
            const body = JSON.parse(res.body);
            const bodyError = body.error;

            if(bodyError === 'Page Not Found'){
                cb('Page Not Found', undefined);
                // console.log('statusCode:', res && res.statusCode);
            }else{
                cb(undefined, res.body);
                // console.log('statusCode:', res && res.statusCode);
            }
        }
    });
}

module.exports = families;