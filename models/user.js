const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    joined:{
        type: Date, 
        default: Date.now
    }
    
});

const User = mongoose.model('user', UserSchema);


module.exports = User;