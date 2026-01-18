const Pola = require('../models/Pola');
const pola_router = require('express').Router();
const decToken = require('../middleware/decToken');
const User = require('../models/User');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../services/cloudinary.js')

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'polas',
        allowedFormats: ['jpg', 'jpeg', 'png'],
        public_id: (req, file) => {
            const uniqueSuffix = Date.now() + Math.round(Math.random()*1e9);
            return "pola"+uniqueSuffix;
        }
    }
})

// upload middleware
const upload = multer({ storage });

// 01 -C- create 
pola_router.post('/create', decToken, upload.single('image'), async (req, res) => {
    try {
        console.log('--- /create route hit ---');
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);
        console.log('Decoded user ID:', req.decodedUserId);

        const { title, description, style }  = req.body;
        // check for valid user
        const user = await User.findById(req.decodedUserId)
        if(!user) {
            console.log('User not found for ID:', req.decodedUserId);
            return res.status(500).json({msg: "user not found"})
        }
        if(!title || !description) {
            console.log('Missing required fields:', { title, description });
            return res.status(500).json({msg: "provide required fields"})
        }

        const image_url = req.file ? req.file.path : null;
        console.log('Image URL to save:', image_url);

        const pola = new Pola({ title, description, user:user._id, image_url, style })
        await pola.save()
        console.log('Pola created:', pola);
        return res.status(201).json(pola)
    }
    catch(err) {
        console.log('Error in /create route:', err);
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


