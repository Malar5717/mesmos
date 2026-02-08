const jwt = require('jsonwebtoken');
const secretJWTKEY = process.env.SECRET_JWT_KEY;

module.exports = decToken = (req, res, next) => {
    const token = req.cookies?.jwt_token;
    if (!token){
        return res.status(401).json({msg:"No Token, Access Denied", isVerified:false});
    }
   
    jwt.verify(token, secretJWTKEY, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({msg:"Invalid Token", isVerified:false});
        }
        // valid userId (with valid token) stored 
        req.decodedUserId = decodedToken.id;
        next();
    });
};

