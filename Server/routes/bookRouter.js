const middlewareController = require('../controllers/middlewareController');
const bookController = require('../controllers/bookController');
const multer = require ('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'images/books/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

const router = require('express').Router();

//ADD book
router.post('/', upload.single('imageUrl'), middlewareController.verifyAdminToken, bookController.addBook);

//GET all books
router.get('/', middlewareController.verifyToken, bookController.getAllBooks);

//GET book by ISBN
router.get('/:isbn', middlewareController.verifyToken, bookController.getBookByISBN)

//UPDATE book
router.put('/:id', upload.single('imageUrl'), middlewareController.verifyAdminToken, bookController.updateBook);

//DELETE book
router.delete('/:id', middlewareController.verifyAdminToken, bookController.deleteBook);
module.exports = router;