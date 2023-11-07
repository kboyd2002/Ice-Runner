const router = require('express').Router();
const{ User } = require('../../models');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        const newUser = req.body;
        newUser.password = await bcrypt.hash(req.body.password, 10)
        
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
            id: uuidv4()
        })

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(userData)
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username,
            }
        })

        const newUser = user.get({ plain: true })

        if (!newUser) {
            res.status(400).json({message: 'No such User ID. Please try again, or create an account'})
            return;
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            res
                .status(400)
                .json({message: 'Invalid password. Please try again.'})
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            res
                .status(200)
                .json({message: 'Thanks for logging in!'})
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logout', (req,res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});