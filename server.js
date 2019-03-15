const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const mongoose = require('mongoose');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const app = express();
const PORT = process.env.PORT || 3000;


//global.Promise is ES6 implementation of promises inside Nodejs
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://admin-anderson:771218@cluster0-p4pkd.mongodb.net/face_recognition', { useNewUrlParser: true });
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
//automatically return 404 not found if no matching route

app.listen(PORT, () => {
    console.log('start listenning');
});