const mongoose = require('mongoose');
const Lecture = mongoose.model('Lectures');

// Access database from here, CRUD (Create, Read, Update, Delete) operations

exports.list_all_lectures = (req, res) => {
  Lecture.find({}, (err, lectures) => {
    if (err){
      res.send(err);
    }
    else {
      res.json(lectures);
    }
  });
};