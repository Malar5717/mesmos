const user_router = require('express').Router();

const decToken = require('../middleware/decToken');
const genToken = require('../services/genToken');

const { signup, login, logout, verifyUser } = require('../controllers/UserController');

user_router.post('/signup', signup);

user_router.post('/login', login);

user_router.get('/logout', logout);

user_router.get('/protected', decToken, verifyUser);

module.exports = user_router;
