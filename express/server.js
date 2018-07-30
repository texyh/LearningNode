const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const hbsHelpers = require('./helpers/handlebarsHelpers');

let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    var now = new Date().toString();

    let log = `${now}: ${req.method}: ${req.url}`;
    fs.appendFileSync('sever.log', log + '\n');

    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

hbsHelpers.registerHelpers(hbs);

app.get('/', (req, res) => {
    // res.send('<b>hello express</b>');
    // res.send({name : 'emeka', 
    //         likes: ['kiss', 'food']})

    res.render('home.hbs', {
        title : 'Home Page',
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title : 'About Page',
    })
})


app.listen(3000, () => {
    console.log('server is running on 3000')
});