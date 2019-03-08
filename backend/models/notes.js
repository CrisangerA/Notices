const { Schema, model} = require('mongoose');

const NoteSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imagePath: { type: String },
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Notes', NoteSchema);