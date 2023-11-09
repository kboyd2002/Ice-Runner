const router = require('express').Router();
const auth = require('../utils/auth')
router.get('/', async (req, res) => {
     res.render('homepage', {
      loggedIn: req.session.loggedIn,
    });
});


router.get('/game', auth, async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');}
    res.render('game');
  });


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
