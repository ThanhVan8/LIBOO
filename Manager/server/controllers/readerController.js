const Reader = require('../models/readerModel');

//show all reader
const index = (req, res, next) => {
    Reader.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
};

//show single reader by ID
const show = (req, res, next) => {
    let ReaderID = req.body.id;
    Reader.findById(ReaderID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
};

//add new reader
const add = (req, res, next) => {
    let reader = new Reader({
        Rid: req.body.Rid,
        name: req.body.name,
        id: req.body.id,
        birthday: req.body.birthday,
        sex: req.body.sex,
        email: req.body.email,
        address: req.body.address,
        makingDay: req.body.makingDay,
        invalidDay: req.body.invalidDay,
    });
    reader.save()
    .then(response => {
        res.json({
            message: 'Reader added successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

//update reader
const update = (req, res, next) => {
    let readerID = req.body.id;

    let updateData = {
        name: req.body.name,
        birthday: req.body.birthday,
        sex: req.body.sex,
        email: req.body.email,
        address: req.body.address,
    }
    Reader.findById(readerID, {$set: updateData})
    .then(() => {
        res.json({
            message: 'Reader updated successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

//delete reader
const destroy = (req, res, next) => {
    let readerid = req.body.id;
    Reader.findByIdAndRemove(readerid)
    .then(() => {
        res.json({
            message: 'Reader deleted successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

module.exports = {
    index, show, add, update, destroy
}