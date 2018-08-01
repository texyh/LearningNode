const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(404).send({
        error : 'page not found',
        name : 'Api 1'
    });
})

app.get('/users', (req, res) => {
    res.send(
        [{ name: 'emeka', age : 48}, 
        {name : 'ada', age : 26}
        ]
    )
})

try {
    app.listen(3000, () => {
        console.log('server started')
    }); 
} catch (error) {
    app.listen(4000);
}


module.exports.app = app;