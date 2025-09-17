const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    usermail: {
        type: String,
        required: true,
        unique: true  // if same mail - more users
    },
    password: {
        type: String,
        required: true
    }
});

// sign up 
userSchema.pre('save', async function (next) {
    if(this.password) {
        try {
            const hashed_password = await bcrypt.hash(this.password, 10)
            this.password = hashed_password
            next()
        }
        catch(err) {
            console.log(err)
        }
    } else {
        console.log("no password")
        next()
    }
});

// log in 
userSchema.methods.compare=function(password) {
    return bcrypt.compare(password, this.password) // func called in UserRoutes.js
}

const User = model('User',userSchema);

module.exports = User;