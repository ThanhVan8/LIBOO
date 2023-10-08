const middlewareController = require('../controllers/middlewareController');
const userController = require('../controllers/userController');
const multer = require ('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'images/users/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

const router = require('express').Router();

//GET all users
router.get('/', middlewareController.verifyAdminToken, userController.getAllUsers);

//ADD one users
router.post('/', upload.single('imageUrl'), middlewareController.verifyAdminToken, userController.addUser);

//UPDATE user
router.put('/:id', middlewareController.verifyAdminToken, userController.updateUser);

//DELETE user
router.delete('/:id', middlewareController.verifyAdminToken, userController.deleteUser);

// //Upload image
// router.post('/upload', , userController.uploadImage);

module.exports = router;