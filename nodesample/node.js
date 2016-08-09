var express = require('express');
var app = express();
//http://0.0.0.0:8083/?firstname=rajesh&lastname=saini
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
 extended: true
}));
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var host = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var server = app.listen(port,host, function () {

 // var host = server.address().address
 // var port = server.address().port
  var url = 'mongodb://0.0.0.0:27017/db';
  app.get('/users', function (req, res) {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', url);
        var document = {name:"David", title:"About MongoDB",message:"About messae"};
           // insert record
           db.collection('users').insert(document, function(err, records) {
               if (err) throw err;


               console.log(records.insertedIds);
           });
        // do some work here with the database.
        var myCursor = db.collection('users').find();
        myCursor.each(function(err, doc) {

        if (doc != null) {
        res.send(doc);
        } else {

        }
     });

      //Close connection
        db.close();
      }
    });

})
  console.log("Example app listening at http://%s:%s", host, port)

})
