const User = require('../models/user'); 

const userController = {
    //GET all users
    getAllUsers: async (req, res) => {
        try{
            const query = { admin: false };
            const users = await User.find(query);
            res.status(200).json(users);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //UPDATE user
    updateUser: async (req, res) => {
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).json('The user has been updated');
        }catch(err){
            res.status(500).json(err);
        }
    },

    //DELETE user
    deleteUser: async (req, res) => {
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json('The user has been deleted');
        }catch(err){
            res.status(500).json(err);
        }
    },
};


module.exports = userController;