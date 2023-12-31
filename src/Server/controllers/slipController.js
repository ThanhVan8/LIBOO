const Slip = require('../models/slip'); 
const User = require('../models/user');
const Book = require('../models/book');
const getWeek = require('date-fns/getWeek')


const slipController = {
    //ADD slip for reader by username and isbn
    addSlipReader: async (req, res) => {
        try{
            const user = await User.findOne({username: req.params.username});
            if(!user){
                return res.status(500).json('User not found');
            }
            const book = await Book.findOne({ISBN: req.params.isbn});
            if(book.borrowed >= book.quantity){
                return res.status(500).json('Book is out of stock');
            }
            if(!book){
                return res.status(500).json('Book not found');
            }
            const slips = await Slip.find({UserID: user._id});
            const week = getWeek(new Date());
            let cnt = 0;

            for (let i = 0; i < slips.length; i++){
                if (getWeek(slips[i].borrowDate) == week){
                    cnt = cnt + slips[i].borrowList.length + 1;
                }
                for (let j = 0; j < slips[i].borrowList.length; j++){
                    if (String(slips[i].borrowList[j].book) == String(book._id)){
                        return res.status(500).json(`User already borrow ${book.name}`);
                    }
                }
            }
            if (cnt > 2){
                return res.status(500).json('User borrow too much books in this week');
            }
            var bookList = []
            tmp = {book: book._id};
            bookList.push(tmp);
            console.log(tmp)
            const newSlip = new Slip({
                UserID: user._id,
                borrowList: bookList,
            })
            const savedSlip = await newSlip.save();
            res.status(200).json(savedSlip);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //ADD slip for manager by SlipId
    addSlipManagerById: async (req, res) => {
        try {
            const slip = await Slip.findByIdAndUpdate(req.params.id, {accepted: true});
            for (let i = 0; i < slip.borrowList.length; i++){
                const query = { _id: slip.borrowList[i].book };
                const book = await Book.findById(query);
                if(book.borrowed >= book.quantity){
                    return res.status(500).json('Book is out of stock');
                }
                let n = book.borrowed + 1;
                await Book.findOneAndUpdate(query, {borrowed: n});

            }
            if (!slip){
                res.status(500).json(err);
            }
            res.status(200).json(slip);
        } catch (err) {
          res.status(500).json(err);
        }
    },
    
    //ADD slip for manager by username
    addSlipManagerByUsername: async (req, res) => {
        try{
            const query = {username: req.params.username};
            const user = await User.findOne(query);
            if(!user){
                return res.status(500).json('User not found');
            }
            const week = getWeek(new Date());
            const slips = await Slip.find({UserID: user._id});
            let bookList = [];
            let cnt = 0;
            for (let i = 0; i < slips.length; i++){
                if (getWeek(slips[i].borrowDate) == week){
                    cnt = cnt + slips[i].borrowList.length + req.body.borrowList.length;
                }
            }
            for (let i = 0; i < req.body.borrowList.length; i++){
                const query = {ISBN: req.body.borrowList[i].ISBN};
                const book = await Book.findOne(query);
                if(book.borrowed >= book.quantity){
                    return res.status(500).json(`${book.name} is out of stock`);
                }
                let n = book.borrowed + 1;
                if (!book){
                    return res.status(500).json('Book not found');
                }
                else{
                    if(cnt > 2){
                        return res.status(500).json('User borrow too much books in this week');
                    }
                    else{
                        for (let i = 0; i < slips.length; i++){
                            for (let j = 0; j < slips[i].borrowList.length; j++){
                                if (String(slips[i].borrowList[j].book) == String(book._id)){
                                    return res.status(500).json(`User already borrow ${book.name}`);
                                }
                            }
                        }
                        let tmp = {book: book._id};
                        bookList.push(tmp);
                        await Book.findOneAndUpdate(query, {borrowed: n});
                    }
                }
            }
            const newSlip = new Slip({
                UserID: user._id,
                borrowList: bookList,
                accepted: true,
              });
            const savedSlip = await newSlip.save();
            res.status(200).json(savedSlip);
        }catch (err) {
            res.status(500).json(err);
        }
    },

    //GET all slips
    getAllSlips: async (req, res) => {
        try{
            const slips = await Slip.find()
            .populate({path: 'UserID', select: 'name email address'})
            .populate({path: 'borrowList.book', select: 'ISBN name author'});
            if(!slips){
                return res.status(500).json(err);            
            }
            res.status(200).json(slips);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //GET all unaccepted slips
    getAllUnacceptedSlips: async (req, res) => {
        try{
            const query = { accepted: false};
            const slips = await Slip.find(query)
            .populate({path: 'UserID', select: 'name email address username'})
            .populate({path: 'borrowList.book', select: 'ISBN name author'});
            if(!slips){
                return res.status(500).json(err);            
            }
            res.status(200).json(slips);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //GET all accepted slips
    getAllAcceptedSlips: async (req, res) => {
        try{
            const query = { accepted: true};
            const slips = await Slip.find(query)
            .populate({path: 'UserID', select: 'name email address username'})
            .populate({path: 'borrowList.book', select: 'ISBN name author'});
            if(!slips){
                return res.status(500).json(err);            
            }
            res.status(200).json(slips);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //GET all accepted slips of 1 reader 
    getAllSlipsOfReader: async (req, res) => {
        try{
            const query = { UserID: req.params.id, accepted: true };
            const slips = await Slip.find(query)
            .populate({path: 'UserID', select: 'name email address'})
            .populate({path: 'borrowList.book', select: 'ISBN name author'});
            if(!slips){
                return res.status(500).json(err);            
            }
            res.status(200).json(slips);
        }catch(err){
            res.status(500).json(err);
        }
    },


    //UPDATE dueDate of 1 book in 1 slip
    updateStatusSlip: async (req, res) => {
        try{
            const slip = await Slip.findById(req.params.id);
            if(!slip){
                return res.status(500).json(err);            
            }
            if (slip.accepted == false){
                slip.accepted = true;
                slip.save();
                res.status(200).json(slip);
            }
            res.status(200).json('The slip has been renewed');
        }catch(err){
            res.status(500).json(err);
        }
    },

    //UPDATE dueDate of 1 book in 1 slip
    updateExpSlip: async (req, res) => {
        try{
            const slip = await Slip.findById(req.params.id);
            const book1 = await Book.findOne({ ISBN: req.params.isbn });
            if(!slip){
                return res.status(500).json('Data not found');            
            }
            if(!book1){
                return res.status(500).json('Book not found');            
            }
            if (slip.accepted){
                const week = getWeek(slip.borrowDate);
                for (let book of slip.borrowList){
                    if (String(book.book) == String(book1._id)){
                        if (getWeek(book.DueDate) - week >= 2){
                            return res.status(500).json('You have exceeded the times allowed to renew');
                        }
                        else{
                            book.DueDate = new Date(book.DueDate.getFullYear(), book.DueDate.getMonth(), book.DueDate.getDate() + 7);
                            slip.save();
                            return res.status(200).json(slip);
                        }
                    }
                } 
            }
            return res.status(200).json('The slip has been renewed');
        }catch(err){
            res.status(500).json(err);
        }
    },

    //DELETE slip
    deleteSlip: async (req, res) => {
        try{
            const slip = await Slip.findByIdAndDelete(req.params.id);
            if(!slip){
                return res.status(500).json(err);            
            }
            res.status(200).json('The slip has been deleted');
        }catch(err){
            res.status(500).json(err);
        }
    },

    //Delete book from slip
    deleteBookFromSlip: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.params.username });
            if(!user){
                return res.status(500).json('User not found');            
            }
            const book1 = await Book.findOne({ ISBN: req.params.isbn });
            if(!book1){
                return res.status(500).json('Book not found');            
            }
            if(req.body.lost == true){
                let m = book1.quantity - 1; 
                const book2 = await Book.findOneAndUpdate({ ISBN: req.params.isbn }, {quantity: m});
                if(!book2){
                    return res.status(500).json(err);
                }
            }
            let n = book1.borrowed - 1;
            const query = { UserID: user._id };
            const slips = await Slip.find(query);
            for (let i = 0; i < slips.length; i++) {
                for (let j = 0; j < slips[i].borrowList.length; j++){
                    if (String(slips[i].borrowList[j].book) == String(book1._id)){
                        const book1 = await Book.findOneAndUpdate({ ISBN: req.params.isbn }, {borrowed: n});
                        if (!book1) 
                            return res.status(500).json(err);
                        slips[i].borrowList.splice(j, 1);
                        slips[i].save();
                        if(slips[i].borrowList.length == 0){
                            await Slip.deleteOne({ _id: slips[i]._id });
                            return res.status(200).json('The slip has been deleted');
                        }
                        return res.status(200).json('The book has been removed');
                    }
                }
            }
            return res.status(500).json('User not borrow this book');            
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Get Slip by username and isbn
    getSlipByUsernameAndISBN: async (req, res) => {
        try{
            const user = await User.findOne({ username: req.params.username });
            const book = await Book.findOne({ ISBN: req.params.isbn });
            const slips = await Slip.find({ UserID: user._id });
            for (let i = 0; i < slips.length; i++) {
                for (let j = 0; j < slips[i].borrowList.length; j++){
                    if (String(slips[i].borrowList[j].book) == String(book._id)){
                        return res.status(200).json(slips[i].borrowList[j]);
                    }
                }
            }
            return res.status(500).json(err);            
        } catch (err){
            res.status(500).json(err);
        }
    },

};


module.exports = slipController;