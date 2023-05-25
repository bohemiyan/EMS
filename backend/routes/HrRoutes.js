const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const { register, update, login, sendOtp, verifyOtp, resetPassword } = require('../controllers/hrController');

router.post('/signup', register);
router.put('/update',requireAuth,update);
router.post('/login', login);

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

module.exports = router;
