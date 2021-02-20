const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
global.schemas = require('./api/models/schemas');
const routes = require('./api/routes/routes');
const auth = require('./api/middlewares/authentication');


mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.tncas.mongodb.net/nachhilfeka?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const port = process.env.PORT || 3000;
console.log("Port: " + port);
const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/profilepics', express.static('profilepics'))
routes(app,auth.authenticateToken);
app.listen(port);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);