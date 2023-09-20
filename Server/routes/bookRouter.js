const bookController = require('../controllers/bookController');

const router = require('express').Router();

//ADD book
router.post('/', bookController.addBook);

//GET all books
router.get('/', bookController.getAllBooks);

//UPDATE book
router.put('/:id', bookController.updateBook);

//DELETE book
router.delete('/:id', bookController.deleteBook);
module.exports = router;