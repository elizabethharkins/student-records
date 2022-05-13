const express = require("express");
const recordRoutes = express.Router();
// connect to the db
const dbo = require("../db/conn");
// convert the 'id' from string to ObjectId for the _id
const ObjectId = require("mongodb").ObjectId;

// get a list of all records
recordRoutes.route("/record").get(function(req, res, next) {
  try {
    let db_connect = dbo.getDb("students");
    db_connect
      .collection("records")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  } catch(err) {
    next(err);
  }
});

// get a single record by 'id'
recordRoutes.route("/record/:id").get(function (req, res, next) {
  try {
    let db_connect = dbo.getDb();
    let query = { _id: ObjectId( req.params.id )};
    db_connect
      .collection("records")
      .findOne(query, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  } catch(err) {
    next(err);
  }
});

// create a new record
recordRoutes.route("/record/add").post(function (req, response, next) {
  try {
    let db_connect = dbo.getDb();
    let studentRecordObj = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      grade: req.body.grade
    };
  
    db_connect.collection("records").insertOne(studentRecordObj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  } catch(err) {
    next(err);
  }
});

// update a record by id
recordRoutes.route("/edit/:id").post(function (req, response, next) {
  try {
    let db_connect = dbo.getDb(); 
    let query = { _id: ObjectId( req.params.id )}; 
    let newvalues = {   
      $set: {     
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        grade: req.body.grade   
      }, 
    }
  
    db_connect.collection("records").updateOne(query, newvalues, function (err, obj) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(obj);
    });
  } catch(err) {
    next(err);
  }
});

// delete a record
recordRoutes.route("/:id").delete((req, response, next) => {
  try {
    let db_connect = dbo.getDb();
    let query = { _id: ObjectId( req.params.id )};
  
    db_connect.collection("records").deleteOne(query, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
  } catch(err) {
    next(err);
  }
});
  
module.exports = recordRoutes;