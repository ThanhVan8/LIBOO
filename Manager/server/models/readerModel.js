const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ReaderSchema = new schema({
    Rid: {
        type: String,
    },
    name: {
        type: String,
    },
    id: {
        type: String,
    },
    birthday: {
        type: String,
    },
    sex: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    makingDay: {
        type: String,
    },
    invalidDay: {
        type: String,
    },
})

const Reader = mongoose.model('Reader', ReaderSchema);
module.exports = Reader;