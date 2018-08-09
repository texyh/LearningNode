const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'emeka';
bcrypt.genSalt(10, (err, salt) => {
    console.log(salt);
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
        bcrypt.compare(password, hash, (err, result) => {
            console.log(result);
        });
    });
});

var data  = {
    id : 10
}

// const token = jwt.sign(data, 'emeka');
// // console.log(token);

// const decoded = jwt.verify(token, 'emeka');
// console.log(decoded);
// var message = 'emeka';
// var hash = SHA256(message).toString();

// console.log(hash);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'emeka').toString()
// }

// var resultHash = SHA256(JSON.stringify(token.data) + 'emeka');

// if(resultHash == token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data Changed');
// }