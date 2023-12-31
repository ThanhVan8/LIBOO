const Book = require('../models/book');
const User = require('../models/user');
const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
    UserID  : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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

    accepted: {
        type: Boolean,
        default: false
    },
})

let Borrow = mongoose.model('Borrow', borrowSchema);

module.exports = Borrow;
