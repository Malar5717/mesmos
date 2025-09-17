const user_router = require('express').Router();
const User = require('../models/User');
const decToken = require('../middleware/decToken');

// JSON Web Token - provides the user with a token which authorizes them through cookies (a)header (b)payload (c)signature
const jwt = require('jsonwebtoken');
// extra protection 
const secretJWTKEY = process.env.SECRET_JWT_KEY;

// generate token - with id (upon sign up or log in)
const genToken = (id, res) => {
    const token = jwt.sign({ id }, secretJWTKEY, { expiresIn: '2d' });
    res.cookie('jwt_token', token, {
        // httpOnly: true,
        secure: false,
        sameSite: 'none',
        // valid time in millisecs 
        maxAge: 2 * 24 * 60 * 60 * 1000
    })
};

// sign up 
user_router.post('/signup', async function (req, res) {
    try {
        const { username, usermail, password } = req.body;

        // User model is a class, assign it to the user object 
        const user = new User({ username, usermail, password });

        await user.save()
        genToken(user._id, res);
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});

// log in
user_router.post('/login', async function (req, res) {
    try {
        const { username, password } = req.body;

        // get the username from the DB
        const user = await User.findOne({ username });
        if(!user) {
            console.log("wrong username");
            res.status(401).json({ msg: "Username or password incorrect!" });
            return;
        }
        const match = await user.compare(password); // func from User.js returns T/F
        console.log(match)

        if (!match) {
            console.log("invalid!");
            res.status(401).json({ msg: "Username or password incorrect!" });
            return;
        }

        genToken(user._id, res);
        res.status(200).json(user);

    } catch (err) {
        console.log(err);
    }
});

// protect - verify the jwt
user_router.get('/protected', decToken, async function (req, res) {
    try{
        const user = await User.findById(req.decodedUserId);
        if (!user) return res.status(404).json({user, isVerified:false});
        return res.status(200).json({user, isVerified:true});
    }
    catch(err){
        console.log(err);
    }
});

module.exports = user_router;
