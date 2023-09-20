const Reader = require('../models/reader'); 
const bcrypt = require('bcrypt'); 

const readerController = {
    //Register 
    register: async (req, res) => {
        try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const newReader = new Reader({
                username: req.body.username,
                password: hashedPassword,
                name: req.body.name,
                id: req.body.id,
                sex: req.body.sex,
                birthday: req.body.birthday,
                email: req.body.email,
                address: req.body.address,
            })
            const savedReader = await newReader.save();
            res.status(200).json(savedReader);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //Login
    login: async (req, res) => {
        try{
            const reader = await Reader.findOne({username: req.body.username});
            if(!reader){
                res.status(400).json('Wrong username');
            }
            const validated = await bcrypt.compare(
                req.body.password, 
                reader.password
            );
            if(!validated){
                res.status(400).json('Wrong password');
            }
            if(reader && validated){
                res.status(200).json("Login successfully");
            }
        }catch(err){
            res.status(500).json(err);
        }
    },

    //GET all readers
    getAllReaders: async (req, res) => {
        try{
            const readers = await Reader.find();
            res.status(200).json(readers);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //UPDATE reader
    updateReader: async (req, res) => {
        try{
            const reader = await Reader.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).json('The reader has been updated');
        }catch(err){
            res.status(500).json(err);
        }
    },

    //DELETE reader
    deleteReader: async (req, res) => {
        try{
            const reader = await Reader.findByIdAndDelete(req.params.id);
            res.status(200).json('The reader has been deleted');
        }catch(err){
            res.status(500).json(err);
        }
    },
};


module.exports = readerController;