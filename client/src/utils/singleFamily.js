//Function written with materials from course: https://www.udemy.com/course/the-complete-nodejs-developer-course-2/
const request = require('postman-request');

//url to single family in api
const familySingle = (_id, cb)=> {

    const url = `http://localhost:3000/api/families/${_id}`;

    request({url: url}, (err, res) => {
        if (err) {
            cb('Unable to connect to family spends api',undefined);
        } else {
            const body = JSON.parse(res.body);
            const bodyError = body.error;

            if (bodyError === 'Family doesn\'t exist') {
                // console.log(bodyError);
                cb('Family doesn\'t exist', undefined)
                // console.log('statusCode:', res && res.statusCode);
            } else {
                cb(undefined, res.body);
                // console.log('statusCode:', res && res.statusCode);
            }
        }
    });
}

module.exports = familySingle;