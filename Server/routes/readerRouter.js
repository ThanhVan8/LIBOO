const readerController = require('../controllers/readerController');

const router = require('express').Router();

//Register
router.post('/register', readerController.register);

//Login
router.post('/login', readerController.login);

//GET all readers
router.get('/', readerController.getAllReaders);

//UPDATE reader
router.put('/:id', readerController.updateReader);

//DELETE reader
router.delete('/:id', readerController.deleteReader);
module.exports = router;