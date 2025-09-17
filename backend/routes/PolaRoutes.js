const Pola = require('../models/Pola');
const pola_router = require('express').Router();
const decToken = require('../middleware/decToken');
const User = require('../models/User');

// const cloudinary = require('../services/cloudinary');

// 01 -C- create 
pola_router.post('/create', decToken, async (req, res) => {
    try {
        const { title, description }  = req.body;
        // check for valid user
        const user = await User.findById(req.decodedUserId)                    
        if(!user) return res.status(500).json({msg: "user not found"})
        if(!title || !description) {
            return res.status(500).json({msg: "provide required fields"})
        }
        const pola = new Pola({title, description, user:user._id})
        // await all DB calls 
        await pola.save()
        return res.status(201).json(pola)
    }
    catch(err) {
        console.log(err);
    }
})

// 02 -R- read 
pola_router.get('/all', async (req, res) => {
    try {
        const polas = await Pola.find({})
        if(polas.length===0) {
            return res.status(404).json({msg: "empty, nothing to display"})
        }
        return res.status(200).json(polas)
    }
    catch(err) {
        console.log(err);
    }
})

pola_router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const pola = await Pola.findById(id)
        if(!pola) {
            return res.status(404).json({msg: "empty"})
        }
        return res.status(200).json(pola)
    }
    catch(err) {
        console.log(err);
    }
})

// 03 -U- update 


module.exports = pola_router