const request = require('request');

const api_token = 'U4wUqg6K5ypbd88gTsrz7o78km1sF8ZXcxjuyZhc4opQHxzMazEguj02Xkgf';

const cotacao = (symbol, callback) => {
    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${api_token}`;

    request({url: url, json: true}, (err, response) =>{
        if(err){
            return callback({
                message :  `Something went wrong: ${err}`,
                code : 500
            }, undefined);
        }        
        
        if(response.body === undefined || response.body.data === undefined){
            return callback({
                message : `No data found`,
                code : 404
            }, undefined);
        }        
        
        const parsedJSON = response.body.data[0]
        const {symbol, price_open, price, day_high, day_low} = parsedJSON

        return callback(undefined, {symbol, price_open, price, day_high, day_low});
    });
}

module.exports = cotacao