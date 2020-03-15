const {Router} = require('express');
const ConsumptionCategory = require('../models/ConsumptionCategory');
const Consumption = require('../models/Consumption');
const auth = require('../middleware/auth.middleware');

const router = Router();

router.post('/categories', auth, async (req, res) => {
    try {
        const {name, value} = req.body;
        const candidate = await ConsumptionCategory.findOne({value});
        if (candidate) {
            return res.status(400).json({message: 'Категория уже есть'});
        }
        const category = new ConsumptionCategory({
            name: name.trim(), value: value.trim()
        });
        await category.save();
        return res.status(201).json({message: 'Категория создана'});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'});
    }
});

router.get('/categories', auth, async (req, res) => {
    try {
        const categories = await ConsumptionCategory.find();
        return res.json(categories);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'});
    }
});

router.post('/create', auth, async (req, res) => {
    try {
        const {name, description, price, category} = req.body;
        const consumption = new Consumption({
            name: name.trim(),
            description: description.trim(),
            price: price.trim(),
            category: category.trim(),
            owner: req.user.userId
        });
        await consumption.save();
        return res.status(201).json({message: 'Расход создан'});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'});
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const consumptions = await Consumption.find({owner: req.user.userId});
        res.json(consumptions);
    } catch(e) {
        res.status(500).json({message: 'Что-то пошло не так'});
    }
});

module.exports = router;
