const request = require('request')

let getWeather = (coordinates) => {
    
    let uri = `https://api.darksky.net/forecast/548c0bb088c8f1eae0af98124d2be4bf/${coordinates.latitude},${coordinates.longitude}`
    return new Promise((resolve, reject) => {
        request({
            url : uri,
            json : true
        }, (error, response, body) => {
            if(error) {
                reject('unable to make request');
            } else if(response.statusCode === 400) {
                reject('unable to find address');
            } else if(response.statusCode === 200) {
                resolve(body.currently.apparentTemperature);
            }
        })
    })
}

module.exports = {
    getWeather
}