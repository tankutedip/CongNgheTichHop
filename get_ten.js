
var express = require("express");
var app = express();

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/my_db', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false});
console.log('connect success!')

var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
 });
 var Person = mongoose.model("Person", personSchema);
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));

 app.get('/get', function(_req, res){
   Person.find({name:_req.query.name},function(_err, response){
      if(_err) console.log("error");
      {res.json(response);
        console.log(response)
      }
   });
});

 app.post('/post', function(req, res){
    //Get the parsed information

    if(!req.body.name || !req.body.age || !req.body.nationality){
       res.send('vui long dien day du thong tin');
    } else {
       var newPerson = new Person({
          name: req.body.name,
          age: req.body.age,
          nationality: req.body.nationality
       });

       newPerson.save(function(err, _Person){
          if(err)
             res.end("loi roi ban oi")
          else
            res.json(req.body);
        });
    }
 });
 app.put('/put/:id', function(req, res){
   Person.findByIdAndUpdate(req.params.id, req.body, function(err, response){
      if(err) res.json({message: "Error in updating person with id " + req.params.id});
      res.json(response);
   });
});
app.delete('/del/:id', function(req, res){
   Person.findByIdAndRemove(req.params.id, function(err, _response){
      if(err) res.send( "Error in deleting record id " + req.params.id);
      else res.send( "Person with id " + req.params.id + " removed.");
   });
});
 app.listen(3001)