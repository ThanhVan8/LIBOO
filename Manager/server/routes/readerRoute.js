const express = require('express');
const router = express.Router();

const ReaderController = require('../controllers/readerController');

router.get('/', ReaderController.index);
router.post('/show', ReaderController.show);
router.post('/add', ReaderController.add);
router.post('/update', ReaderController.update);
router.post('/delete', ReaderController.destroy);

module.exports = router;