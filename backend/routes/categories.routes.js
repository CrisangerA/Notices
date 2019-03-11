const { Router } = require('express');
const router = Router();
const Categories = require('../models/categories');

router.post('/', async (req, res) =>{
    const { name } = req.body;
    const newCategory = new Categories({name});
    await newCategory.save();
    res.json({status: 'Category saved'});
});

router.get('/', async (req, res) =>{
    const categories = await Categories.find();
    res.json(categories);
});

router.get('/:id', async (req, res) =>{
    const categorie = await Categories.findById(req.params.id);
    res.json(categorie);
});

router.put('/:id', async (req, res) =>{
    const { name } = req.body;
    const newCategory = { name };
    await Categories.findByIdAndUpdate(req.params.id, newCategory);
    res.json({status: 'Category edited'});
});

router.delete('/:id', async (req, res) =>{
    await Categories.findByIdAndDelete(req.params.id);
    res.json({status: 'Category deleted'})
});

module.exports = router;