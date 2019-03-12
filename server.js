const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const mongoose = require('mongoose');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');


const db = knex ({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    }
  });


// const db = knex ({
//   client: 'pg',
//   connection: {
//     host: '127.0.0.1',
//     user: 'anderson',
//     password: '',
//     database:'face-recognition' 
//   }
// });

// //global.Promise is ES6 implementation of promises inside Nodejs
// mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost/face_recognition', { useNewUrlParser: true });
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log('connect to mongoDB successfully');
// });


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send("hi i'm root") });
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)});
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)});
//app.put('/image', (req, res) => { image.handleImage(req, res, db)});
//app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db));


app.listen(process.env.PORT || 3000, () => {
    console.log('start listenning');
});