
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
const fetch = require('node-fetch');
const express = require('express');
const request = require('request');
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

      function getName(item,index){
        var name = [item.name].join(" ");
        return name;
      }
       res.setHeader('Content-Type', 'text/html');
        var Arr = result.map(getName);
        for (var a in Arr){
          if(Arr[a] == na){
            res.write('Found'+'<br>');
            console.log('Found');
          } else{
            res.write('Not Found'+'<br>');

            console.log('Not Found');
          }
        }
        for (var a in Arr){
          var wir = Arr[a];
          res.write(wir+'<br>');
        }
        res.end();
      }else{
        console.log("Not Found");
      }
    });
  db.close()
  });
});

app.get('/codeforce',(req,res)=>{
  var url1 = 'http://codeforces.com/api/user.info?handles=Ahmed_maruf';
  request(url1, (error, response, body)=> {
    if (!error && response.statusCode === 200) {
      res.setHeader('Content-Type', 'text/html');
      var js = JSON.parse(body);
      var ex =js.result;
      function getName(item,index){
        var name = [item.country].join(" ");
        return name;
      }
      var arr = ex.map(getName);
      for(var k in arr){
          res.write(arr[k]);
      }
      res.end();
    } else {

    }
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
