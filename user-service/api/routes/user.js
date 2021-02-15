const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/myuser');


router.get('/', (req, res, next) =>{                    //To get all users
    User.find()
    .exec()
    .then(docs => {
      console.log(docs);
      //   if (docs.length >= 0) {
      res.status(200).json(docs);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', (req, res, next) =>{                   //
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.price,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        dob: req.body.dob,
        joindate: req.body.joindate,
        consumption: req.body.consumption,
        logmech: req.body.logmech
    });
    user
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /Users",
        createdUser: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:userId',(req, res, next) => {     //The userId is assigned by the semicolon sytax
    const id = req.params.userId;
    User.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch('/:userId',(req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    User.updateMany({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});

router.delete('/:userId',(req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});


module.exports = router;

/*
1. You do not return anything from those methods since returning more than one response is not a good idea.
2. Also since there is just one item inside the json method it directly returns that
3. Npm is a dependency tool from where you download all the dependencies.
4. The npm commanded created a json folder. You should do it too
5. We are using express framework for nodeJs
6. We create the server in JavaScript using NodeJS
7. .populate() can be used to get only a part of the data.
8. The incoming data can only be parsed via a json or an url method.
9. The multer package can take files apart from binary and json data
 */