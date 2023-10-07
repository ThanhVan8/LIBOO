const Book = require('../models/book'); 

const bookController = {
    //ADD book
    addBook: async (req, res) => {
        try{
            const newBook = new Book(req.body);
            const savedBook = await newBook.save();
            res.status(200).json(savedBook);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //GET all books
    getAllBooks: async (req, res) => {
        try{
            const books = await Book.find();
            res.status(200).json(books);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //GET book by ISBN
    getBookByISBN: async (req, res) => {
        try{
            const book = await Book.findOne({ISBN: req.params.isbn});
            res.status(200).json(book);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //UPDATE book
    updateBook: async (req, res) => {
        try{
            const reader = await Book.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).json('The book has been updated');
        }catch(err){
            res.status(500).json(err);
        }
    },

    //DELETE book
    deleteBook: async (req, res) => {
        try{
            const book = await Book.findByIdAndDelete(req.params.id);
            res.status(200).json('The book has been deleted');
        }catch(err){
            res.status(500).json(err);
        }
    },
};


module.exports = bookController;