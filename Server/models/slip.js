const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
    Rid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reader',
    },
    
    borrowDay: {
        type: Date,
        default: Date.now
    },

    borrowList:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Book',
    }
})

let Borrow = mongoose.model('Borrow', borrowSchema);

module.exports = Borrow;
