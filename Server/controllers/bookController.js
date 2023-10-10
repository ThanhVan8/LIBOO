const Book = require('../models/book'); 

const bookController = {
    //ADD book
    addBook: async (req, res) => {
        try{
            const newBook = new Book(req.body);
            if (req.file){
                newBook.imageUrl = req.file.filename;
            }
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
            if(!books){
                return res.status(500).json(err);            
            }
        }catch(err){
            res.status(500).json(err);
        }
    },

    //GET book by ISBN
    getBookByISBN: async (req, res) => {
        try{
            const book = await Book.findOne({ISBN: req.params.isbn});
            if(!book){
                return res.status(500).json(err);            
            }
            res.status(200).json(book);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //UPDATE book
    updateBook: async (req, res) => {
        try{
            const book = await Book.findByIdAndUpdate(req.params.id, req.body);
            if(req.file){
                book.imageUrl = req.file.filename;
                book.save();
            }
            if(!book){
                return res.status(500).json(err);            
            }
            res.status(200).json('The book has been updated');
        }catch(err){
            res.status(500).json(err);
        }
    },

    //DELETE book
    deleteBook: async (req, res) => {
        try{
            const book = await Book.findByIdAndDelete(req.params.id);
            if (!book){
                return res.status(500).json(err);            
            }
            res.status(200).json('The book has been deleted');
        }catch(err){
            res.status(500).json(err);
        }
    },
};


module.exports = bookController;