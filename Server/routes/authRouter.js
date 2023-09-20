const authController = require('../controllers/authController');

const router = require('express').Router();

//Register
router.post('/register', authController.register);

//Login
router.post('/login', authController.login);

module.exports = router;
