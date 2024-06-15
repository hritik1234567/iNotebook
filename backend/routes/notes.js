const express = require('express')
var fetchuser = require('../middleware/fetchuser');
const Notes = require("../models/Notes");
const mongoose=require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { body, validationResult } = require('express-validator');
const router = express.Router();
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });

        res.json(notes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 6 }),

], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const note = new Notes({ title, description, tag, user: req.user.id });
        const savenote = await note.save();

        res.json(savenote);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newnote = {};
    if (title) {
        newnote.title = title;
    }
    if (description) {
        newnote.description = description;
    }
    if (tag) {
        newnote.tag = tag;
    }
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send("Not found") }
    if (note.user.toString() !== req.user.id) { return res.status(401).send("Cannot be updated") }
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
    res.json({ note });
})

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid ObjectId' });
        
    }

    let note = await Notes.findById(id);
    if (!note) { return res.status(404).send("Not found") }
    if (note.user.toString() !== req.user.id) { return res.status(401).send("Cannot be updated") }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({ "Succesfully deleted the note": "Yaadein mit gyi" });
})

module.exports = router;