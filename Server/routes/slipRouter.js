const slipController = require('../controllers/slipController');

const router = require('express').Router();

//ADD slip
router.post('/:id', slipController.addSlip);

//GET all slips
router.get('/', slipController.getAllSlips);

//GET all slip of 1 user
router.get('/:id', slipController.getAllSlipsOfReader);

//UPDATE slip
router.put('/:id1/:id2', slipController.updateSlip);

//DELETE slip
router.delete('/:id', slipController.deleteSlip);

//DELETE book from slip
router.delete('/:id1/:id2', slipController.deleteBookFromSlip);

module.exports = router;