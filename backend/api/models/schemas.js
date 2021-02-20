const mongoose = require("mongoose");
const { Schema } = mongoose;


const tutorialsSchema = new Schema(
  {
    class_size: Number,
    tutor: { type: Schema.Types.ObjectId, ref: "Users" }, //foreign key
    lecture: { type: Schema.Types.ObjectId, ref: "Lectures" }, //foreign key
    title: String,
    meeting_url: String,
    creation_date: { type: Date, default: Date.now },
    // students: [
    //   { type: Schema.Types.ObjectId, ref: "Users" }, //foreign keys -- redundant because tutorial IDs are saved in user.student_in
    // ],
    date: Date,
    description: String,
    is_Active: Boolean
  },
  { collection: "Tutorials" }
);

const usersSchema = new Schema({
  first_name: String,
  last_name: String,
  username: String,
  email: String,
  salt: String,
  password: String,
  credits: Number,
  creation_date: { type: Date, default: Date.now },
  // tutor_in: [
  //   { type: Schema.Types.ObjectId, ref: 'Tutorials' } //foreign keys -- redundant because tutorID is saved in tutorial.tutor
  // ],
  student_in: [
    { type: Schema.Types.ObjectId, ref: 'Tutorials' } //foreign keys
  ],
  expert_of_lectures: [{ type: Schema.Types.ObjectId, ref: 'Lectures' }],
  imgPath: { type: String, default: '' },
},
  { collection: "Users" }
);

const lecturesSchema = new Schema({
  title: String,
  description: String,
  is_Active: Boolean
},
  { collection: "Lectures" }
);

const discussionsSchema = new Schema({
  value: String,
  creation_date: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "Users" }, //foreign key
  tutorialId: { type: Schema.Types.ObjectId, ref: "Tutorials" } //foreign key
},
  { collection: "Discussions" }
);

const Users = mongoose.model('Users', usersSchema);
const Tutorials = mongoose.model('Tutorials', tutorialsSchema);
const Lectures = mongoose.model('Lectures', lecturesSchema);
const Discussions = mongoose.model('Discussions', discussionsSchema);

module.exports = { Users, Tutorials, Lectures, Discussions };
