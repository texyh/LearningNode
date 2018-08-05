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

//     //deleteMany
//     // db.collection('Todos').deleteMany({text: 'something to do'}).then((result) => {
//     //     console.log(result);
//     // })

//     //deleteOne
//     //db.collection('Todos').deleteOne({text : 'make'}).then(result => console.log(result));

//     //findOneAndDelete
//     //db.collection('Todos').findOneAndDelete({completed: false}).then(doc => console.log(doc));


//     //client.close();
// })