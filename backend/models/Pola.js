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
    }
    // media_upload: {
    //     type: String
    // },
    // location: {
    //     type: {
    //         type: String,
    //         enum: ['Point'], 
    //         default: 'Point'df  `
    //     },
    //     coordinates: {
    //         type: [Number], 
    //     }
    // }

}, {
    timestamps: true
})

const Pola = mongoose.model('Pola',polaSchema);

module.exports = Pola;