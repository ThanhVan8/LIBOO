const jwt = require ('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const middlewareController = {
    //verify token
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if(err){
                    return res.status(403).json('Token is not valid');
                }
                req.user = user;
                next();
            });
        }
        else{
            return res.status(401).json('You are not authenticated');
        }
    },
    //verify admin
    verifyAdminToken: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if(req.user.admin == true){
                next();
            }
            else{
                return res.status(403).json('You are not allowed to do that');
            }
        })
    },
}

module.exports = middlewareController;