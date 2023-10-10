const middlewareController = require('../controllers/middlewareController');
const slipController = require('../controllers/slipController');

const router = require('express').Router();

//ADD slip for reader by username and isbn
router.post('/reader/:username/:isbn',middlewareController.verifyToken, slipController.addSlipReader);

//ADD slip for manager by id
router.post('/manager/id/:id',middlewareController.verifyAdminToken, slipController.addSlipManagerById);

//ADD slip for manager by username
router.post('/manager/username/:username',middlewareController.verifyAdminToken, slipController.addSlipManagerByUsername);

//GET all slips
router.get('/all',middlewareController.verifyAdminToken, slipController.getAllSlips);

// GET all unaccepted slips
router.get(`/unaccepted`,middlewareController.verifyAdminToken, slipController.getAllUnacceptedSlips);

// GET all accepted slips
router.get(`/accepted`,middlewareController.verifyAdminToken, slipController.getAllAcceptedSlips);

//GET all slip of 1 user
router.get('/:id',middlewareController.verifyToken ,slipController.getAllSlipsOfReader);

//GET slip by username and isbn
router.get('/:username/:isbn',middlewareController.verifyAdminToken, slipController.getSlipByUsernameAndISBN);

//UPDATE status slip
router.put('/:id',middlewareController.verifyAdminToken, slipController.updateStatusSlip);

//UPDATE renewExp slip
router.put('/:id1/:id2',middlewareController.verifyAdminToken, slipController.updateExpSlip);

//DELETE slip
router.delete('/:id',middlewareController.verifyAdminToken, slipController.deleteSlip);

//DELETE book from slip
router.delete('/:username/:isbn',middlewareController.verifyAdminToken, slipController.deleteBookFromSlip);

module.exports = router;