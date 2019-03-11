const { Schema, model } = require('mongoose');

const NotesshortSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = model('NotesShort', NotesshortSchema);