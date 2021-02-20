const tutorialBuilder = require('../controllers/tutorialController');
const discussionBuilder = require('../controllers/discussionController');
const userBuilder = require('../controllers/userController');
const lectureBuilder = require('../controllers/lectureController');
const auth = require('../controllers/authController');
const multer = require('multer');
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true)
  }
  else {
    cb(null, false)
  }
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './profilepics/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + "_" + file.originalname.replace(/ +/g, ""))
  }
})
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

module.exports = (app, guard) => {  //Add guard to all get/post requests where the user has to be authenticated
  app
    .route('/tutorials')
    .get(tutorialBuilder.list_all_tutorials)
    .post(tutorialBuilder.create_a_tutorial);

  app
    .route('/tutorial/:tutorialId')
    .get(guard, tutorialBuilder.read_a_tutorial)
    .put(guard, tutorialBuilder.update_a_tutorial)
    .delete(guard, tutorialBuilder.delete_a_tutorial);

  app
    .route('/users')
    .get(userBuilder.list_all_users) //Would need extra permission setup for a superuser to list all other users
    .post(upload.single('img'), userBuilder.create_a_user);

  app
    .route('/user/:userId')
    .get(guard, userBuilder.read_a_user)
    .put(upload.single('img'), guard, userBuilder.update_a_user)
    .delete(userBuilder.delete_a_user);

  app
    .route('/discussion/:tutorialId')
    .post(guard, discussionBuilder.create_a_comment)
    .get(guard, discussionBuilder.list_all_comments)
    .put(guard, discussionBuilder.update_a_comment)
    .delete(guard, discussionBuilder.delete_a_comment);

  app
    .route('/lectures')
    .get(lectureBuilder.list_all_lectures)

  app
    .route('/login')
    .post(auth.login)

  app
    .route('/verifyRefreshToken')
    .post(auth.verifyRefreshToken)

  app
    .route('/verifyTokenSalt')
    .post(guard, auth.verifyTokenSalt)

  app
    .route('/updatePassword')
    .post(guard, auth.updatePassowrd)

  app
    .route('/forgotPassowrd')
    .post(auth.generatePassToken)

};