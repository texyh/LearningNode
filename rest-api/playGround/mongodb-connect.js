// // const MongoClient = require('mongodb').MongoClient;
// const {MongoClient, ObjectID} = require('mongodb');

// // var obj = new ObjectID();
// // console.log(obj);

// MongoClient.connect('mongodb://localhost:27017/TodoDB', (err, client) => {
//     if(err) {
//         console.log('Unable to connect')
//         return;
//     }
//     const db = client.db('TodoDB');
//     console.log('connected to db successfully');

//     // db.collection('Todos').insertOne({
//     //     text: 'something to do',
//     //     completed : false
//     // }, (err, result) => {
//     //     if(err) {
//     //         return console.log('Unable to insert todo', err)
//     //     }

//     //     console.log(JSON.stringify(result.ops), undefined, 2)
//     // })

//     // db.collection('Users').insertOne({
//     //     name : 'emeka',
//     //     age : 40,
//     //     location : 'lagos'
//     // }, (err, result) => {
//     //     if(err) {
//     //         return console.log(err)
//     //     }

//     //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
//     // })
//     client.close();
// } )