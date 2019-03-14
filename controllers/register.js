const User = require('../models/user');
const Login = require('../models/login');
const handleRegister = (req, res, bcrypt) => {

    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    let newUser = new User({name: name, email: email});
    let newLogin = new Login({email: email, hash: hash});
    User.insertMany([newUser])
    .then(users => {
        res.json(users[0]);
        Login.insertMany([newLogin])
        .then(logins => console.log(logins[0]))
        .catch(err => console.log(err));
    })
    .catch(err => {
        return res.status(400).json('unable to register');
        console.log(err);
    });
    
}

module.exports = { handleRegister };