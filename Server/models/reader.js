const mongoose = require('mongoose');

const readerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    id: {
        type: String,
        required: true,
        unique: true,
    },

    birthday: {
        type: Date,
        required: true,
    },   

    sex: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
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





let Reader = mongoose.model('Reader', readerSchema);

module.exports = Reader;