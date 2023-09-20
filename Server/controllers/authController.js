const User = require('../models/user');
const bcrypt = require('bcrypt'); 

const authController = {
        //Register 
        register: async (req, res) => {
            try{
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                const newUser = new User({
                    username: req.body.username,
                    password: hashedPassword,
                    name: req.body.name,
                    id: req.body.id,
                    sex: req.body.sex,
                    birthday: req.body.birthday,
                    email: req.body.email,
                    address: req.body.address,
                })
                const savedUser = await newUser.save();
                res.status(200).json(savedUser);
            }catch(err){
                res.status(500).json(err);
            }
        },
    
        //Login
        login: async (req, res) => {
            try{
                const user = await User.findOne({username: req.body.username});
                if(!user){
                    res.status(400).json('Wrong username');
                }
                const validated = await bcrypt.compare(
                    req.body.password, 
                    user.password
                );
                if(!validated){
                    res.status(400).json('Wrong password');
                }
                if(user && validated){
                    res.status(200).json("Login successfully");
                }
            }catch(err){
                res.status(500).json(err);
            }
        },    
}

module.exports = authController;
