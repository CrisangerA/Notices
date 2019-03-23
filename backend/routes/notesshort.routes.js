const { Router } = require('express');
const router = Router();
const NotesShort = require('../models/notesshort');

router.post('/', async (req, res) => {
    const { description, category } = req.body;
    const newNoteShort = NotesShort({ description, category});
    await newNoteShort.save();
    res.json({status: 'Note saved'});
});

router.get('/', async (req, res) => {
    const notesshort = await NotesShort.find();
    res.json(notesshort);
});

router.get('/:id', async (req, res) => {
    const noteShort = await NotesShort.findById(req.params.id);
    res.json(noteShort);
});

router.put('/:id', async (req, res) =>{
    const { description, category} = req.body;
    const newNoteShort = { description, category};
    await NotesShort.findByIdAndUpdate(req.params.id, newNoteShort);
    res.json({status: 'Note edited'});
});

router.delete('/:id', async (req, res) =>{
    await NotesShort.findByIdAndDelete(req.params.id);
    res.json({status: 'Note deleted'});
});

module.exports = router;