var express = require('express');
var router = express.Router();
var path = require('path');

app.set('views', path.join(_dirname, 'view'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
res.send("hello world!");
});
app.get('/ejs', function(req, res, next) {

  let s (property) name: string
      {name: 'PHP'},
      {name: 'Ruby'},
      {name: 'Java'},
      {name: 'Python'},
      {name: 'dotNet'},
      {name: 'C#'},
      {name: 'Swift'},
      {name: 'Pascal'},
  ]
  res.render('ejs', { title: 'Demo Ejs', list: subjectList });
});

app.listen(3000);

