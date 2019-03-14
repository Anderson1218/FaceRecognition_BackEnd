const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    hash: {
        type: String,
        required: [true, 'Name is required']
    }
});

const Login = mongoose.model('login', LoginSchema);


module.exports = Login;