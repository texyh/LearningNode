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

//     // db.collection('Todos').find(
//     //     {_id: new ObjectID('5b6225a31408511e5849bd62')}
//     // ).toArray().then((docs) => {
//     //     console.log(JSON.stringify(docs, undefined, 2));
//     // }, err => console.log(err));

//     db.collection('Users').find(
//         {name: 'ada'}
//     ).toArray().then((docs) => {
//         console.log(JSON.stringify(docs, undefined, 2));
//     }, err => console.log(err));

//     // db.collection('Todos').find().count().then((count) => {
//     //     console.log(count);
//     // }, err => console.log(err));

//     //client.close();
// })