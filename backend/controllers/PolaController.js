const pola_router = require('express').Router();
const decToken = require('../middleware/decToken');
const Pola = require('../models/Pola');
const { create } = require('../models/User');

// 02 -R- read 

// all
const getAll = async (req, res) => {
    try {
        const polas = await Pola.find({}).sort({ createdAt: -1 });
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

module.exports = { getAll, getMyMemories, getOne };