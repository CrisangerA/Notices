const { Schema, model } = require('mongoose');

const CategorieSchema = new Schema({
    name: { type: String, required: true}
});

module.exports = model('Categories', CategorieSchema);