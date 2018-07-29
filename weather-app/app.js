const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
.options({
    a : {
        demand: true,
        alias: 'address',
        describe : 'Address to get whether',
        string : true
    }
}).help()
.argv;
geocode.geoCodeAddress(argv.a).then((address) => {
    const cordinates = {
        longitude : address.longitude,
        latitude : address.latitude
    }
    return weather.getWeather(cordinates);
}).then((temperature) => {
    console.log(`The current temperature  is ${temperature}` );
}).catch((err) => {
    console.log(err)
})
 



// 548c0bb088c8f1eae0af98124d2be4bf
