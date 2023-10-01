const User = require('../models/user');
const bcrypt = require('bcrypt'); 
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const format =  require ('date-fns');
let refreshTokens = [];

dotenv.config();


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
                admin: req.body.admin,
            })
            const savedUser = await newUser.save();
            res.status(200).json(savedUser);
        }catch(err){
            res.status(500).json(err);
        }
    },

    // Create access token
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user._id,
            admin: user.admin,
        },
        process.env.JWT_ACCESS_KEY,
        {expiresIn: '30d'}
        )
    },

    // Create refresg token
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user._id,
            admin: user.admin,
        },
        process.env.JWT_REFRESH_KEY,
        {expiresIn: '365d'}
        )
    },
    
    //Login
    login: async (req, res) => {
        try{
            const user = await User.findOne({username: req.body.username});
            if(!user){
                return res.status(400).json('Wrong username');
            }
            const validated = await bcrypt.compare(
                req.body.password, 
                user.password
            );
            if(!validated){
                return res.status(400).json('Wrong password');
            }
            if(user && validated){
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                //store refresh token in cookie
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict',
                });
                const {password, ...others} = user._doc;
                res.status(200).json({...others, accessToken});
            }
        }catch(err){
            res.status(500).json(err);
        }
    },   
    
    // refresh token
    requestRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json('You are not authenticated');
        }
        if(! refreshTokens.includes(refreshToken)){
            return res.status(403).json('Refresh token is not valid');
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if(err){
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            //create new accessToken
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            });
            res.status(200).json({accessToken: newAccessToken});
        });
    },

    // logout
    logout: async (req, res) => {
        // clear token in cookie
        res.clearCookie('refreshToken')
        refreshTokens = refreshTokens.filter(
            token => token !== req.cookies.refreshToken
        );
        res.status(200).json('Logged out');
    }
};

module.exports = authController;
