const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, // creates unique index in DB, violation will throw duplicate key error E11000
        trim: true,
        maxlength: 30
    },
    usermail: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        loercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    }
}, { timestamps: true });

// sign up 
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
    catch (err) {
        next(err);
    }
});

// log in 
// no arrow function, they dont have 'this' binding 
userSchema.methods.compare = function (password) {
    return bcrypt.compare(password, this.password) 
};

const User = model('User', userSchema);

module.exports = User;