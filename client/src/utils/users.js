const request = require('postman-request');

const users = (cb) => {
    //url to users list in api
    const url = 'http://localhost:3000/api/users';
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

module.exports = users;