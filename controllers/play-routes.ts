const router = require('express').Router();
const { User, Scores, Character } = require('../models');

// const loggedIn =  require

router.get('/', async (req, res) => {
    try {
        const gamePlay = await User.findOne({
            include: [
            {
                model: Character,
                attributes: ['']
            }
            ]
        })
    } catch {}
}) 