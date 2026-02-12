const Pola = require('../models/Pola');
const pola_router = require('express').Router();
const { create, getAll, getMyMemories, getOne } = require('../controllers/PolaController');
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
            const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
            return "pola" + uniqueSuffix;
        }
    }
})

// upload middleware
const upload = multer({ storage });

// C- create 
pola_router.post('/create', decToken, upload.single('image'), create);

// R- read
pola_router.get('/all', getAll);

pola_router.get('/my', decToken, getMyMemories);

pola_router.get('/:id', getOne);

// 03 -U- update 
pola_router.put('/:id', decToken, async (req, res) => {
    try {
        const id = req.params.id
        const pola = await Pola.findById(id)
        if (pola.user != req.decodedUserId) {
            return res.status(403).json({ msg: "forbidden" });
        }
        const { title, description } = req.body
        const updateObj = {}
        if (title) {
            updateObj['title'] = title
        } if (description) {
            updateObj['description'] = description
        }
        const updatedPola = await Pola.findByIdAndUpdate(id, updateObj, { new: true })
        return res.status(200).json(updatedPola)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "server error" });
    }
})

// 04 -D- delete 
pola_router.delete('/:id', decToken, async (req, res) => {
    try {
        const id = req.params.id
        const pola = await Pola.findById(id)
        if (!pola) {
            return res.status(404).json({ msg: "not found" });
        }
        if (pola.user != req.decodedUserId) {
            return res.status(403).json({ msg: "forbidden" })
        }
        const deletedPola = await Pola.findByIdAndDelete(id)
        return res.status(200).json(deletedPola)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "server error" });
    }
})

module.exports = pola_router


