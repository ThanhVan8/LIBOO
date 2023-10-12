const middlewareController = require('../controllers/middlewareController');
const userController = require('../controllers/userController');
const router = require('express').Router();

//GET all users
router.get('/', middlewareController.verifyAdminToken, userController.getAllUsers);

//ADD one users
router.post('/', middlewareController.verifyAdminToken, userController.addUser);

//UPDATE user
router.put('/:id', middlewareController.verifyToken, userController.updateUser);

//DELETE user
router.delete('/:id', middlewareController.verifyAdminToken, userController.deleteUser);

module.exports = router;