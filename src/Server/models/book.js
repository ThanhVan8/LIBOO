const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    ISBN: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    author: {
        type: String,
        required: true,
    },

    publisher: {
        type: String,
        required: true,
    },

    publishYear: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    genre: {
        type: [String],
        required: true,
    },

    price:{
        type: Number,
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
    },

    borrowed:{
        type: Number,
        default: 0,
    },

    image: {
        type: String,
    },
});

let Book = mongoose.model('Book', bookSchema);

module.exports = Book ;
