var express = require("express");
var mongoose = require("mongoose");
var app = express();
var methordOverride = require("method-override");
var things = require('./things.js');

app.use(express.urlencoded(
  {
    extended: true,
  }
));
app.use(express.json());
app.use(methordOverride("_method"));
app.use('/things', things);

const { Schema } = mongoose;
var uri = 'mongodb://localhost:27017/abc';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
 }).then((db) => console.log("DB is connected")).catch((err) => console.log(err));
//mongoose.connect(, {useNewUrlParser: true});
const MyModel = mongoose.model('Product', new Schema({ productID:String,productName: String,price:String,quantity:String }));

     function mongooseToObject(mongooseArray){
        return mongooseArray ? mongooseArray.toObject():mongooseArray;
    }


  app.get("/:productID", function (req, res, next) {   
    MyModel.findOne({productID:req.params.productID})
      .then((Product) =>{
        res.json(mongooseToObject(Product))
      })
      .catch(next);
  });

app.listen(3000, (db) => console.log("Processing"));