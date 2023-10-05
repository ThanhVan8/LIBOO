const authController = require('../controllers/authController');
const middlewareController = require('../controllers/middlewareController');

const router = require('express').Router();

//Register
router.post('/register', authController.register);

//Login
router.post('/login', authController.login);

//Refresh
router.post('/refresh', authController.requestRefreshToken);

//Logout
router.post('/logout/:id', middlewareController.verifyToken , authController.logout);


module.exports = router;
