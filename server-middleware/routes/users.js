const express = require('express');
const router = express.Router()

router.get('/me', (req, res) => {
  res.json(req.user.profile);
})

module.exports = router;
