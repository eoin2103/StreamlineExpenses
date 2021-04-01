const router = require('express').Router();
const User = require('../model/User');
const {registerValidator} = require('../validation');
const {loginValidator} = require('../validation');
const dotenv = require('dotenv');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register
router.post('/register', async (req, res) => {

    //Validation before user registration
    const {error} = registerValidator(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if user is already registered
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send('Email already registered');
   
    //encrypt the password
    const salt = await bcrypt.genSalt(10);
    const encryPass = await bcrypt.hash(req.body.password, salt);

    //create user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: encryPass,
        usertype: "employee"
    });
    try {
        const addUser = await user.save();
        res.send({user: user.id});
    }catch(err){
        res.status(400).send(err);
    }
});

//login
router.post('/login', async (req, res) => {
    //validate inputted data
    const {error} = loginValidator(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if email and password exist and are correct
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or password is incorrect!');

    const passwordValid = await bcrypt.compare(req.body.password, user.password);
    if(!passwordValid) return res.status(400).send('Email or password is incorrect!');

    const jtoken = jwt.sign({_id: user._id}, process.env.JTOKEN_SECRET, {expiresIn: 86400});
    res.header('auth-jwt', jtoken).send(jtoken);


});

module.exports = router;