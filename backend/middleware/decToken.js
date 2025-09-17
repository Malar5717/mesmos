const jwt = require('jsonwebtoken');
const secretJWTKEY = process.env.SECRET_JWT_KEY;

module.exports = decToken = (req, res, next) => {
    const token = req.cookies.jwt_token;
    if (!token){
        return res.status(404).json({isVerified:false})
    }
    // error first mechanism - handle error, then proceed further 
    jwt.verify(token, secretJWTKEY, (err, decodedToken) => {
        if (err) return res.status(403).json({isVerified:false});
        // error handled, valid userId (with valid token) stored 
        req.decodedUserId = decodedToken.id;
        next();
    });
}

