var express = require("express");
var app = express();

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/abc', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false});
console.log('connect success!')

var toursSchema = mongoose.Schema({
    tourID: String,
    tourName: String,
    price: String,
    nights: String,
    days: String
 });
 var Tour = mongoose.model("Tour", toursSchema);
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));

 app.get('/get', function(_req, res){
   Tour.find({tourName:_req.query.tourName},function(_err, response){
      if(_err) console.log("error");
      {res.json(response);
        console.log(response)
      }
   });
});

app.get('/days', function(_req, res){
    Tour.find({days:_req.query.days},function(_err, response){
       if(_err) console.log("error");
       {res.json(response);
         console.log(response)
       }
    });
 });
 

 app.post('/post', function(req, res){

    if(!req.body.tourName || !req.body.tourID || !req.body.price || !req.body.nights || !req.body.days){
       res.send('vui long dien day du thong tin');
    } else {
       var newTour = new Tour({
          tourName: req.body.tourName,
          //tourID: req.body.tourID,
          price: req.body.price,
          nights: req.body.nights,
          days: req.body.days
       });

       newTour.save(function(err, _Tour){
          if(err)
             res.end("loi roi ban oi")
          else
            res.json(req.body);
        });
    }
 });
 app.put('/put/:tourID', function(req, res){
   Tour.findByIdAndUpdate(req.params.tourID, req.body, function(err, response){
      if(err) res.json({message: "Error in updating tour with id " + req.params.tourID});
      res.json(response);
   });
});
app.delete('/del/:tourID', function(req, res){
   Tour.findByIdAndRemove(req.params.tourID, function(err, _response){
      if(err) res.send( "Error in deleting record id " + req.params.tourID);
      else res.send( "Tour with id " + req.params.tourID + " removed.");
   });
});
 app.listen(3001)