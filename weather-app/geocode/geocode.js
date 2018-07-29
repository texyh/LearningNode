
const request = require('request');

let geoCodeAddress = (address) => {
    
let enCodedaddress = encodeURIComponent(address);

const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${enCodedaddress}`;
    return new Promise((resolve, reject) => {
        request({
            url : url,
            json : true
        }, (error, response, body) => {
            if(error) {
                reject('unable to make request');
            } else if(body.status === 'ZERO_RESULTS') {
                reject('unable to find address');
            } else if(body.status === 'OK') {
                var r = body.results[0]
                resolve({
                    address : r.formatted_address,
                    latitude : body.results[0].geometry.location.lat,
                    longitude : body.results[0].geometry.location.lng
                })
            }
            
        
        })
    })
}

module.exports = {
    geoCodeAddress
}