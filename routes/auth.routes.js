const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const Consumption = require('../models/Consumption');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth.middleware');

const router = Router();

router.post('/registration', [
    check('name', 'Введите имя').exists(),
    check('surname', 'Введите фамилию').exists(),
    check('login', 'Минимальная длина логина - 6 символов').isLength({min: 6}),
    check('password', 'Минимальная длина пароля - 6 символов').isLength({min: 6})
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            });
        }
        const {login} = req.body;
        const isLoginExists = await User.findOne({login});
        if (isLoginExists) {
            return res.status(400).json({message: 'Пользователь с таким логином уже зарегистрирован. Повторите попытку с другим логином'});
        }
        const {name, surname, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({name, surname, login, password: hashedPassword});
        await user.save();
        return res.status(201).json({message: 'Пользователь создан'});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'});
    }
});

router.post('/login', [
    check('login', 'Введите логин').exists(),
    check('password', 'Введите пароль').exists()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            });
        }
        const {login, password} = req.body;
        const user = await User.findOne({login});
        if (!user) {
            return res.status(400).json({message: 'Пользователь с таким логином не найден'});
        }
        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return res.status(400).json({message: 'Неверный пароль'});
        }
        const token = jwt.sign({userId: user.id}, config.get('jwtSecret'), {expiresIn: '1h'});
        return res.json({token, userId: user.id, message: 'Авторизация прошла успешно'});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'});
    }
});

router.get('/currentUser', auth, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.userId);
        if (!currentUser) {
            return res.status(401).json({message: 'Пользователь не авторизован'});
        }
        const {name, surname, login} = currentUser;
        const consumptions = await Consumption.find({owner: req.user.userId, });
        let consumptionAmount = 0;
        if (consumptions.length) {
            consumptions.forEach(item => {
                consumptionAmount = consumptionAmount + item.price;
            })
        }
        res.json({
            name, surname, login, consumptionAmount
        });
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'});
    }
});

module.exports = router;
