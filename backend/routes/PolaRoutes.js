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
        const polas = await Pola.find({}).sort({createdAt: -1}) // newest first
        if(polas.length===0) {
            return res.status(404).json({msg: "empty, nothing to display"})
        }
        return res.status(200).json(polas)
    }
    catch(err) {
        console.log(err);
    }
})

// id can reach unverified persons 
pola_router.get('/my', decToken, async (req, res) => {
    try {
        const id = req.decodedUserId
        const polas = await Pola.find({user: id}).sort({createdAt: -1})
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
        return res.status(200).json(pola.populate("user", "username"))
    }
    catch(err) {
        console.log(err);
    }
})

// 03 -U- update 
pola_router.put('/:id', decToken, async (req, res) => {
    try {
        const id = req.params.id
        const pola = await Pola.findById(id)
        if(pola.user!=req.decodedUserId) {
            return res.status(403).json({msg: "forbidden"})
        }
        const { title, description } = req.body
        const updateObj = {}
        if(title) {
            updateObj['title'] = title
        }if(description) {
            updateObj['description'] = description
        }
        const updatedPola = await Pola.findByIdAndUpdate(id, updateObj, {new:true})
        return res.status(200).json(updatedPola)
    }
    catch(err) {
        console.log(err)
    }
})

// 04 -D- delete 
pola_router.delete('/:id', decToken, async (req, res) => {
    try {
        const id = req.params.id
        const pola = await Pola.findById(id)
        if(pola.user!=req.decodedUserId) {
            return res.status(403).json({msg: "forbidden"})
        }
        const deletedPola = await Pola.findByIdAndDelete(id)
        return res.status(200).json(deletedPola)
    }
    catch(err) {
        console.log(err)
    }
})

module.exports = pola_router 


