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





let Reader = mongoose.model('Reader', readerSchema);

module.exports = Reader;