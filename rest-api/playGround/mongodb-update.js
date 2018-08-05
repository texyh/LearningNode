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

//     db.collection('Todos').findOneAndUpdate({
//         _id : new ObjectID('5b6225f5891d893500e1e6ed')
//     }, {
//         $set : {
//             complete: true
//         }
//     }, {
//         returnOriginal: false
//     }).then(result =>  console.log(result));
//     //client.close();
// })