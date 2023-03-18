const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const { register,update,login } = require('../controllers/hrController');

router.post('/signup', register);
router.put('/update',requireAuth,update);
router.post('/login', login);

module.exports = router;
