const User = require('../models/User');
const genToken = require('../services/genToken');

const signup = async (req, res) => {
    try {
        const { username, usermail, password } = req.body;

        if (!username || !usermail || !password) {
            return res.status(400).json({ msg: "All fields are required!" });
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { usermail }]
        });
        if (existingUser) {
            return res.status(409).json({ msg: "Username or email already exists!" });
        }

        const user = new User({ username, usermail, password });

        await user.save();
        // auto-login 
        genToken(user._id, res);

        res.status(201).json(user);
    }
    catch (err) {
        // 99% prevented, still -extra error handling 
        if (err.code === 11000) {
            return res.status(400).json({ msg: "Username or email already exists!" });
        }

        console.log(err);
        return res.status(500).json({ msg: "Server error. Please try again." });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ msg: "All fields are required!" });
        }

        const user = await User.findOne({ username }).select('+password');

        if (!user) {
            return res.status(401).json({ msg: "Username or password incorrect!" });
        }

        const match = await user.compare(password);

        if (!match) {
            return res.status(401).json({ msg: "Username or password incorrect!" });
        }

        genToken(user._id, res);
        res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).json({ msg: "Server error. Please try again." });
    }
};

const logout = async (req, res) => {
    const isProd = process.env.NODE_ENV === 'production';
    res.clearCookie('jwt_token', {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax'
    });
    res.status(200).json({ msg: "Logged out successfully" });
};

const verifyUser = async (req, res) => {
    try {
        const user = await User.findById(req.decodedUserId);

        if (!user) {
            return res.status(401).json({ msg: "User not found", isVerified: false });
        }

        res.status(200).json({ user, isVerified: true });
    }
    catch (err) {
        return res.status(500).json({ msg: "Server error. Please try again.", isVerified: false });
    }
};

module.exports = { signup, login, logout, verifyUser }; 