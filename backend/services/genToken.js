const jwt = require('jsonwebtoken');
const secretJWTKEY = process.env.SECRET_JWT_KEY;

// generate token - with id (upon sign up or log in)
const genToken = (id, res) => {
    const token = jwt.sign({ id }, secretJWTKEY, { expiresIn: '4d' });
    res.cookie('jwt_token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        // valid time in millisecs 
        maxAge: 4 * 24 * 60 * 60 * 1000
    });
};

module.exports = genToken;// JSON Web Token - provides the user with a token which authorizes them through cookies (a)header (b)payload (c)signature
