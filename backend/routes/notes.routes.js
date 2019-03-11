const { Router } = require('express');
const router = Router();
const Notes = require('../models/notes');

router.post('/', async (req, res) => {
    const { title, description, category } = req.body;
    const newNote = new Notes({title, description, category});
    await newNote.save();
    res.json({status: 'Note saved'});
});

router.get('/', async (req, res) => {
    const notes = await Notes.find();
    res.json(notes);
});

router.get('/:id', async (req, res) => {
    const note = await Notes.findById(req.params.id);
    res.json(note);
});

router.put('/:id', async (req, res) =>{
    const { title, description, category } = req.body;
    const newNote = { title, description, category };
    await Notes.findByIdAndUpdate(req.params.id, newNote);
    res.json({status: 'Note edited'});
});

router.delete('/:id', async (req, res) => {
    await Notes.findByIdAndDelete(req.params.id);
    res.json({status: 'Note deleted'});
});


module.exports = router;