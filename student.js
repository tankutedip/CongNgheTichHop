var express = require('express');
var router = express.Router();
var student = [
   {StudentID: 101, Fullname: "Tran Thi Ngoc Huyen", Subject: "Math", Grade: 10},
];
router.get('/:StudentID([0-9]{3,})', function(req, res){
   var currstudent = student.filter(function(student){
      if(student.StudentID == req.params.StudentID){
         return true;
      }
   });
   
   if(currstudent.length == 1){
      res.json(currstudent[0])
   } else {
      res.status(404);  //Set status to 404 as student was not found
      res.json({message: "Not Found"});
   }
});
router.post('/', function(req, res){
   //Check if all fields are provided and are valid:
   if(!req.body.Fullname ||
      !req.body.Subject ||
      !req.body.Grade){
      res.status(400);
      res.json({message: "Bad Request"});
   } else {
      var newId = student[student.length-1].StudentID+1;
      student.push({
         StudentID: newId,
         Fullname: req.body.Fullname,
         Subject: req.body.Subject,
         Grade: req.body.Grade
      });
      res.json({message: "New Student created.", location: "/student/" + newId});
   }
});

router.put('/:StudentID', function(req, res) {
   //Check if all fields are provided and are valid:
   if(!req.body.Fullname ||
      !req.body.Subject ||
      !req.body.Grade ||
      !req.params.StudentID.toString().match(/^[0-9]{3,}$/g)){
      res.status(400);
      res.json({message: "Bad Request"});
   } else {
      //Gets us the index of movie with given id.
      var updateIndex = student.map(function(student){
         return student.StudentID;
      }).indexOf(parseInt(req.params.id));
      
      if(updateIndex === -1){
         //Movie not found, create new
         student.push({
            StudentID: req.params.StudentID,
            Fullname: req.body.Fullname,
            Subject: req.body.Subject,
            Grade: req.body.Grade
         });
         res.json({
            message: "New student created.", location: "/student/" + req.params.StudentID});
      } else {
         //Update existing movie
         student[updateIndex] = {
            StudentID: req.params.StudentID,
            Fullname: req.body.Fullname,
            Subject: req.body.Subject,
            Grade: req.body.Grade
         };
         res.json({message: "Student id " + req.params.StudentID + " updated.",
            location: "/student/" + req.params.StudentID});
      }
   }
});

router.delete('/:StudentID', function(req, res){
   var removeIndex = student.map(function(student){
      return student.StudentID;
   }).indexOf(req.params.StudentID); //Gets us the index of movie with given id.
   
   if(removeIndex === -1){
      res.json({message: "Not found"});
   } else {
      student.splice(removeIndex, 1);
      res.send({message: "Student id " + req.params.StudentID + " removed."});
   }
});

module.exports = router;