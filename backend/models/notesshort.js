const { Schema, model } = require('mongoose');

const NotesshortSchema = new Schema({
    description: { type: String, required: true },
    category: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = model('NotesShort', NotesshortSchema);