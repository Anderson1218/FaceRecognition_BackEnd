const User = require('../models/user');
const Login = require('../models/login');
const handleRegister = (req, res, db, bcrypt) => {

    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    //insert hash and email to 'login' table
    db.transaction(trx => {
    trx.insert({
        hash: hash,
        email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
        return trx('users')
        .returning('*')
        .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
        })
        .then(user => {
            res.json(user[0]);
        })
    })
    .then(trx.commit)
    .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'));
    // let newLogin = new Login({email: email, hash: hash});
    // let newUser = new User({name: name, email: email});


}

module.exports = { handleRegister };