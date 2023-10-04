const middlewareController = require('../controllers/middlewareController');
const slipController = require('../controllers/slipController');

const router = require('express').Router();

//ADD slip for reader
router.post('/reader/:id',middlewareController.verifyToken, slipController.addSlipReader);

//ADD slip for manager
router.post('/manager/:id',middlewareController.verifyAdminToken, slipController.addSlipManager);

//GET all slips
router.get('/all',middlewareController.verifyAdminToken, slipController.getAllSlips);

// GET all unaccepted slips
router.get('/unaccepted',middlewareController.verifyAdminToken, slipController.getAllUnacceptedSlips);

//GET all slip of 1 user
router.get('/:id',middlewareController.verifyToken ,slipController.getAllSlipsOfReader);

//UPDATE status slip
router.put('/:id',middlewareController.verifyAdminToken, slipController.updateStatusSlip);

//UPDATE renewExp slip
router.put('/:id1/:id2',middlewareController.verifyAdminToken, slipController.updateExpSlip);

//DELETE slip
router.delete('/:id',middlewareController.verifyAdminToken, slipController.deleteSlip);

//DELETE book from slip
router.delete('/:id1/:id2',middlewareController.verifyAdminToken, slipController.deleteBookFromSlip);

module.exports = router;