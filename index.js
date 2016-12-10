
'use strict'

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
const fetch = require('node-fetch');
const express = require('express');
const request = require('request');
const _ = require('lodash');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const HackerRank = require('machinepack-hackerrank');


var app = express();

//uses things here
app.use(helmet()); //initial helmet here
app.use(helmet.noCache()); //nocache
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"]
  }
}));
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//set things here
app.set('views', __dirname + '/views');
app.set('view engine' , 'ejs');


//get things here
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
      res.render('pages/contest', {
        results: result
    });
    }
  });
});

app.get('/categories' , (req,res) => {
    res.render('pages/categories');
});

app.get('/problems/:tags', (req,res) => {
  var problemsUrl = 'http://codeforces.com/api/problemset.problems?tags='+req.params.tags;
  request(problemsUrl , (err,response,body) => {
    if(!err && response.statusCode === 200){
      var problemData = JSON.parse(body);
      var problemDataresult = problemData.result.problems;
      res.render('pages/problems', {
        problemDataresults : problemDataresult,
        tags : req.params.tags
    });
    }
  });
});

app.get('/test',(req,res) => {
  res.render('pages/test');
});



app.get('/submit',(req,res) => {
  // Submit the source code for compilation
  HackerRank.submit({
  apiKey: 'hackerrank|1319254-1122|20ebcf8f9202144537435867e6f43edc2781d56e',
  source: '<?php $a = $b+$c; echo $a ?>',
  language: 7,
  testcases: ["9","8","-11"],
  wait: true,
  callbackUrl: 'http://solvetracker.herokuapp.com/test',
  format: 'json',
  }).exec({
  // An unexpected error occurred.
  error: function (err){
    throw err;
  },
  // OK.
  success: function (response){
    response = JSON.parse(response).result;
    res.send(response);

  },
  });
});




//disable part

app.disable('x-powered-by');

app.listen(process.env.PORT || 3000,  () => {
  console.log('app start');
});
