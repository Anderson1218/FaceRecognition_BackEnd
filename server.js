const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const mongoose = require('mongoose');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const app = express();

//global.Promise is ES6 implementation of promises inside Nodejs
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/face_recognition', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connect to mongoDB successfully');
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send("hi i'm root") });
app.post('/register', (req, res) => { register.handleRegister(req, res, bcrypt)});
app.post('/signin', (req, res) => { signin.handleSignin(req, res, bcrypt)});
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)});
//app.put('/image', (req, res) => { image.handleImage(req, res)});
//app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res));


app.listen(process.env.PORT || 3000, () => {
    console.log('start listenning');
});