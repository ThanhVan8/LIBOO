const readerController = require('../controllers/readerController');

const router = require('express').Router();

//ADD reader
router.post('/', readerController.addReader);
//GET all readers
router.get('/', readerController.getAllReaders);

module.exports = router;