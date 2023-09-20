const userController = require('../controllers/userController');

const router = require('express').Router();

//GET all readers
router.get('/', userController.getAllUsers);

//UPDATE reader
router.put('/:id', userController.updateUser);

//DELETE reader
router.delete('/:id', userController.deleteUser);

module.exports = router;