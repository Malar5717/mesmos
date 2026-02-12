const Pola = require('../models/Pola');
const User = require('../models/User');

// 01 -C- create
const create = async (req, res) => {
    try {
        const { title, description, style, isPrivate } = req.body;
        const image_url = req.file ? req.file.path : null;
        const id = req.decodedUserId;

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ msg: "user not found" });
        }

        if (!title || !description) {
            return res.status(400).json({ msg: "provide required fields" });
        }

        const pola = new Pola({ title, description, user: user._id, image_url, style, isPrivate });
        await pola.save();

        return res.status(201).json({ msg: "pola created successfully" });
    } catch (err) {
        return res.status(500).json({ msg: "server error" });
    }
}

// 02 -R- read 

// all
const getAll = async (req, res) => {
    try {
        const polas = await Pola.find({ isPrivate: false }).sort({ createdAt: -1 });
        // const polas = await Pola.find({}).sort({ createdAt: -1 });
        if (polas.length === 0) {
            return res.status(404).json({ msg: "empty, nothing to display" });
        }
        return res.status(200).json(polas);
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}

// my memories 
const getMyMemories = async (req, res) => {
    try {
        const id = req.decodedUserId
        const polas = await Pola.find({ user: id }).sort({ createdAt: -1 }).lean()
        if (polas.length === 0) {
            return res.status(404).json({ msg: "empty, nothing to display" })
        }
        return res.status(200).json(polas)
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "server error" });
    }
}

// one
const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const pola = await Pola.findById(id).populate("user", "username");
        if (!pola) {
            return res.status(404).json({ msg: "empty" });
        }
        return res.status(200).json(pola);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "server error" });
    }
}

// 03 -U- update


module.exports = { create, getAll, getMyMemories, getOne };