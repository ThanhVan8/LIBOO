const mongoose = require('mongoose');

const readerSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    id: {
        type: String,
    },

    birthday: {
        type: Date,
    },   

    sex: {
        type: String
    },

    email: {
        type: String,
    },

    address: {
        type: String,
    },

    makingDay: {
        type: Date,
        default: Date.now
    },

    invalidDay: {
        type: Date,
        default: function () {
            if (this.makingDay) {
              const year = this.makingDay.getFullYear();
              return new Date(year + 2, this.makingDay.getMonth(), this.makingDay.getDate());
            }
            return null;
          },
      },
})

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

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
    },
})

const borrowSchema = new mongoose.Schema({
    Rid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reader',
    },
    
    borrowDay: {
        type: Date,
    },

    borrowList:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Book',
    }
})

const statusSchema = new mongoose.Schema({
    name: {
        type: String,
    },
})

const returnSchema = new mongoose.Schema({
    Rid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reader',
    },
    
    borrowSlip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Borrow',
    },

    returnDay: {
        type: Date,
    },

    returnBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },
    
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status', 
    }
})

let Reader = mongoose.model('Reader', readerSchema);
let Book = mongoose.model('Book', bookSchema);
let Genre = mongoose.model('Genre', genreSchema);
let Borrow = mongoose.model('Borrow', borrowSchema);
let Return = mongoose.model('Return', returnSchema);
let Status = mongoose.model('Status', statusSchema);

module.exports = {Reader, Book, Genre, Borrow, Return, Status};