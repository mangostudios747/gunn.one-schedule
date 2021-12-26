const express = require('express');
const router = express.Router()
const passport = require('../passport')

router.use(passport.authenticate('jwt', { session: false }))
router.get('/me', (req, res) => {
  res.json(req.user.profile);
})

module.exports = router;
