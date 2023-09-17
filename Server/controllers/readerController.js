const {Reader} = require('../models/models'); 

const readerController = {
    //ADD reader
    addReader: async (req, res) => {
        try{
            const newReader = new Reader(req.body);
            const savedReader = await newReader.save();
            res.status(200).json(savedReader);
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
};


module.exports = readerController;