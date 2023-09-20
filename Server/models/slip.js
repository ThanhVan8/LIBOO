const Book = require('../models/book');
const Reader = require('../models/reader');
const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reader',
    },
    
    borrowDate: {
        type: Date,
        default: Date.now
    },

    borrowList: [
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
            },
            DueDate: {
                type: Date,
                default: function () {
                    const day = new Date();
                    const year = day.getFullYear();
                    return new Date(year, day.getMonth(), day.getDate() + 7);
                }
            },
        }
    ],
})

let Borrow = mongoose.model('Borrow', borrowSchema);

module.exports = Borrow;
