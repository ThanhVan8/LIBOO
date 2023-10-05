const Slip = require('../models/slip'); 
const User = require('../models/user');
const Book = require('../models/book');
const { query } = require('express');
const { where } = require('../models/book');

const slipController = {
    //ADD slip for reader
    addSlipReader: async (req, res) => {
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

    //ADD slip for manager by SlipId
    addSlipManagerById: async (req, res) => {
        try {
            const slip = await Slip.findByIdAndUpdate(req.params.id, {accepted: true});
            for (let i = 0; i < slip.borrowList.length; i++){
                const query = { _id: slip.borrowList[i].book };
                const book = await Book.findById(query);
                let n = book.borrowed + 1;
                await Book.findOneAndUpdate(query, {borrowed: n});

            }
            res.status(200).json(slip);
            if (!slip){
                res.status(500).json(err);
            }
        } catch (err) {
          res.status(500).json(err);
        }
    },
    
    //ADD slip for manager by username
    addSlipManagerByUsername: async (req, res) => {
        try{
            const query = {username: req.params.username};
            const user = await User.findOne(query);
            let bookList = [];
            if(!user){
                res.status(500).json(err);
            }
            for (let i = 0; i < req.body.borrowList.length; i++){
                const query = {ISBN: req.body.borrowList[i].ISBN};
                const book = await Book.findOne(query);
                let n = book.borrowed + 1;
                if (!book){
                    res.status(500).json(err);
                }
                else{
                    let tmp = {book: book._id};
                    bookList.push(tmp);
                    await Book.findOneAndUpdate(query, {borrowed: n});
                }
            }
            const newSlip = new Slip({
                UserID: user._id,
                borrowList: bookList,
                accepted: true,
              });
            const savedSlip = await newSlip.save();
            res.status(200).json(savedSlip);
        }catch (err) {
            res.status(500).json(err);
        }
    },

    //GET all slips
    getAllSlips: async (req, res) => {
        try{
            const slips = await Slip.find()
            .populate({path: 'UserID', select: 'name email address'})
            .populate({path: 'borrowList.book', select: 'ISBN name author'});
            res.status(200).json(slips);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //GET all unaccepted slips
    getAllUnacceptedSlips: async (req, res) => {
        try{
            const query = { accepted: false };
            const slips = await Slip.find(query)
            .populate({path: 'UserID', select: 'name email address username'})
            .populate({path: 'borrowList.book', select: 'ISBN name author'});
            res.status(200).json(slips);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //GET all slips of 1 reader 
    getAllSlipsOfReader: async (req, res) => {
        try{
            const query = { UserID: req.params.id };
            const slips = await Slip.find(query)
            .populate({path: 'UserID', select: 'name email address'})
            .populate({path: 'borrowList.book', select: 'ISBN name author'});
            res.status(200).json(slips);
        }catch(err){
            res.status(500).json(err);
        }
    },


    //UPDATE dueDate of 1 book in 1 slip
    updateStatusSlip: async (req, res) => {
        try{
            const slip = await Slip.findById(req.params.id);
            if (slip.accepted == false){
                slip.accepted = true;
                slip.save();
                res.status(200).json(slip);
            }
            res.status(200).json('The slip has been renewed');
        }catch(err){
            res.status(500).json(err);
        }
    },

    //UPDATE dueDate of 1 book in 1 slip
    updateExpSlip: async (req, res) => {
        try{
            const slip = await Slip.findById(req.params.id1);
            if (slip.accepted){
                for (let book of slip.borrowList){
                    if (book.book == req.params.id2){
                        book.DueDate = new Date(book.DueDate.getFullYear(), book.DueDate.getMonth(), book.DueDate.getDate() + 7);
                        slip.save();
                        res.status(200).json(slip);
                    }
                }            
                res.status(200).json('The slip has been renewed');
            }
            res.status(300).json('The slip is invalid');
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
                await slip.save();
                res.status(200).json(slip);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
};


module.exports = slipController;