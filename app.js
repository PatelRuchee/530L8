var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var logger = require('morgan');
var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;


mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://ryerson:123456a@cluster0.sqfnr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
var conn = mongoose.books;

var bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    publiher: String,
    date: String,
    website: String
});

var books = mongoose.model('books', bookSchema);
module.exports = books;

app.get('/',function(req,res){
    res.send('<h3>Ruchi Patel<h3>');
});

app.get("/bookinventory/list", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");

  MongoClient.connect('mongodb+srv://ryerson:123456a@cluster0.sqfnr.mongodb.net/mydb?retryWrites=true&w=majority', function (err, client) {
    if (err) throw err
    var db=client.db('mydb');

  db.collection('books').findOne({ title: req.body.title,
    author: req.body.author, 
    publisher: req.body.publisher, 
    date: req.body.date, 
    website: req.body.website}, (err, formres) => {
    if (err) {
        console.log(err);
    } else {
      console.log("couldnt find data");
      res.status(401).send({success: false, error: {message: "coundt connect to database"}}); 
    }
})
})
});

app.post('/bookinventory/add', (req, res) => {
  MongoClient.connect('mongodb+srv://ryerson:123456a@cluster0.sqfnr.mongodb.net/mydb?retryWrites=true&w=majority', function (err, client) {
    if (err) throw err
    var db=client.db('mydb');
    db.collection('books').insertOne({
      title: req.body.title,
      author: req.body.author, 
      publisher: req.body.publisher, 
      date: req.body.date, 
      website: req.body.website}, (err, formres) => {
      if (err) {
          console.log(err);
      }
      else {
        console.log("couldnt add data");
        res.status(401).send({success: false, error: {message: "couldnt add data"}}); 
      }
      
  })
})
});


module.exports = app;

