const router = require('express').Router();
const{ User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        })

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(newUser)
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

        if (!user) {
            res
                .status(400)
                .json({message: 'No such User ID. Please try again, or create an account'})
            return;
        }

        const validPassword = await user.checkPassword(req.body.password);

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

route.post('/logout', (req,res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});