const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    ISBN: {
        type: String,
    },

    name: {
        type: String,
    },

    author: {
        type: String,
    },

    publisher: {
        type: String,
    },

    publishYear: {
        type: Number,
    },

    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
    },

    price:{
        type: Number,
    },

    quantity: {
        type: Number,
    },
})

let Book = mongoose.model('Book', bookSchema);

module.exports = Book ;
