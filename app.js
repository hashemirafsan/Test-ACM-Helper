
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
const fetch = require('node-fetch');
const express = require('express');
var app = express();

var na = "rafsan jani";
var url = 'mongodb://localhost:27017/user_table'
app.get('/database',(req,res) => {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    var colle = db.collection('movie');
    colle.find({}).toArray(function (err,result){
      if(err){
        console.log(err);
      }else if(result.length){

      dex = JSON.stringify(result);
      pase = JSON.parse(dex);

      function getName(item,index){
        var name = [item.name].join(" ");
        return name;
      }
      var Arr = pase.map(getName);
      for (var a in Arr){
        if(Arr[a] == na){
          res.send('Found');
          console.log('Found');
        } else{
          res.send('Not Found');
          console.log('Not Found');
        }
      }


      }else{
        console.log("Not Found");
      }
    });
  db.close()
  });
});

app.listen(process.env.PORT || 3000,  () => {
  console.log('app start');
});
/*
fetch(url)
    .then((res) => {
        return res.json();
    }).then((json) => {
        console.log(json);
    });
*/
