const User = require('../models/user');
const Login = require('../models/login');


const handleSignin = (req, res, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
    }
    
    Login.findOne({email: email})
    .then(user => {
        if(user === null) {
            return res.status(400).json("can't find user");
        }
        console.log('signin:', user);
        const isValid = bcrypt.compareSync(password, user.hash);
        if (isValid) {
            User.findOne({email: email})
            .then(user => res.json(user))
            .catch(err => res.status(400).json("can't find user"))
        } else {
            res.status(400).json('wrong password');
        }
    })
    .catch(err => res.status(400).json('unable to get user'))

}

module.exports = { handleSignin };