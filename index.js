
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
const fetch = require('node-fetch');
const express = require('express');
const request = require('request');
var app = express();

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine' , 'ejs');

app.get('/',(req,res) => {
  res.render('pages/index',{title : 'Solve Tracker'});
});

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

app.get('/profile',(req,res)=>{
  var url1 = 'http://codeforces.com/api/user.info?handles=PutulPoly';
  request(url1, (error, response, body)=> {
    if (!error && response.statusCode === 200) {
      res.setHeader('Content-Type', 'text/html');
      var js = JSON.parse(body);
      console.log(js);
      var ex =js.result;
      function getName(item,index){
        var name = [item.firstName,item.lastName].join(" ");
        return name;
      }
      var arr = ex.map(getName);
      for(var k in arr){
          res.write("<a href='#'>" +arr[k]+"</a>");
      }
      res.end();
    } else {

    }
  });
});

app.get('/contest', (req,res) => {
  var contestUrl = ' http://codeforces.com/api/contest.list';
  request(contestUrl , (err,response,body) => {
    if(!err && response.statusCode === 200){
      var data = JSON.parse(body);
      var result = data.result;
    }
  });

  var drinks = [
    { name: 'Bloody Mary', drunkness: 3 },
    { name: 'Martini', drunkness: 5 },
    { name: 'Scotch', drunkness: 10 }
];
    res.render('pages/contest', drinks);
});

app.get('/problem' , (req,res) => {
  var problemUrl = 'http://codeforces.com/api/problemset.problems?tags=implementation';
  request(problemUrl , (err,response,body) => {
    if(!err && response.statusCode === 200){
      var data = JSON.parse(body);
      res.send(data);
    }
  });
});

app.listen(process.env.PORT || 3000,  () => {
  console.log('app start');
});
