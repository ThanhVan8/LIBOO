const Slip = require('../models/slip'); 
const User = require('../models/user');
const { query } = require('express');
const { where } = require('../models/book');

const slipController = {
    //ADD slip
    addSlip: async (req, res) => {
        try{
            const newSlip = new Slip({
                UserID: req.params.id,
                borrowList: req.body.borrowList,
            })
            const savedSlip = await newSlip.save();
            res.status(200).json(savedSlip);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //GET all slips
    getAllSlips: async (req, res) => {
        try{
            const slips = await Slip.find().populate('UserID').populate('borrowList.book');
            res.status(200).json(slips);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //GET all slips of 1 reader 
    getAllSlipsOfReader: async (req, res) => {
        try{
            const query = { UserID: req.params.id };
            const slips = await Slip.find(query).populate('UserID').populate('borrowList.book');
            res.status(200).json(slips);
        }catch(err){
            res.status(500).json(err);
        }
    },


    //UPDATE dueDate of 1 book in 1 slip
    updateSlip: async (req, res) => {
        try{
            const slip = await Slip.findById(req.params.id1);
            for (let book of slip.borrowList){
                if (book.book == req.params.id2){
                    book.DueDate = new Date(book.DueDate.getFullYear(), book.DueDate.getMonth(), book.DueDate.getDate() + 7);
                    slip.save();
                    res.status(200).json(slip);
                }
            }            
            res.status(200).json('The slip has been renewed');
        }catch(err){
            res.status(500).json(err);
        }
    },

    //DELETE slip
    deleteSlip: async (req, res) => {
        try{
            const slip = await Slip.findByIdAndDelete(req.params.id);
            res.status(200).json('The slip has been deleted');
        }catch(err){
            res.status(500).json(err);
        }
    },

    //Delete book from slip
    deleteBookFromSlip: async (req, res) => {
        try {
            const slip = await Slip.findById(req.params.id1);
            const index = slip.borrowList.findIndex(book => book.book == req.params.id2);
            if (index !== -1) {
                slip.borrowList.splice(index, 1);
                await slip.save(); // Lưu slip sau khi xóa phần tử
                res.status(200).json(slip);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
};


module.exports = slipController;