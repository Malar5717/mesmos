const mongoose = require('mongoose')

const polaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image_url: {
        type: String
    },
    style: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

polaSchema.index({ createdAt: -1 });
polaSchema.index({ user: 1, createdAt: -1 });

const Pola = mongoose.model('Pola',polaSchema);

module.exports = Pola;