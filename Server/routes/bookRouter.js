const middlewareController = require('../controllers/middlewareController');
const bookController = require('../controllers/bookController');

const router = require('express').Router();

//ADD book
router.post('/',middlewareController.verifyAdminToken, bookController.addBook);

//GET all books
router.get('/',middlewareController.verifyToken, bookController.getAllBooks);

//UPDATE book
router.put('/:id',middlewareController.verifyAdminToken, bookController.updateBook);

//DELETE book
router.delete('/:id',middlewareController.verifyAdminToken, bookController.deleteBook);
module.exports = router;