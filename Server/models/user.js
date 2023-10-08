const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 6,
        maxlength: 20,
        unique: true,
    },

    password: {
        type: String,
    },

    admin: {
        type: Boolean,
        default: false,
    },

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
        type: String,
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
        type: Date
    },

    imageUrl: {
        type: String,
    }
});

userSchema.pre('save', function (next) {
    if (this.admin == true) {
        this.makingDay = undefined;
        this.invalidDay = undefined;
    } else {
        if (!this.makingDay) {
            this.makingDay = new Date();
        }
        if (!this.invalidDay) {
            const year = this.makingDay.getFullYear();
            this.invalidDay = new Date(year + 2, this.makingDay.getMonth(), this.makingDay.getDate());
        }
    }
    next();
});



let User = mongoose.model('User', userSchema);

module.exports = User;