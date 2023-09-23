const middlewareController = require('../controllers/middlewareController');
const slipController = require('../controllers/slipController');

const router = require('express').Router();

//ADD slip
router.post('/:id',middlewareController.verifyAdminToken, slipController.addSlip);

//GET all slips
router.get('/',middlewareController.verifyAdminToken, slipController.getAllSlips);

//GET all slip of 1 user
router.get('/:id',middlewareController.verifyToken ,slipController.getAllSlipsOfReader);

//UPDATE slip
router.put('/:id1/:id2',middlewareController.verifyAdminToken, slipController.updateSlip);

//DELETE slip
router.delete('/:id',middlewareController.verifyAdminToken, slipController.deleteSlip);

//DELETE book from slip
router.delete('/:id1/:id2',middlewareController.verifyAdminToken, slipController.deleteBookFromSlip);

module.exports = router;