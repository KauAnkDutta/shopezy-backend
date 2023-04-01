const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

const userMiddleware = async(req, res, next) => {
    try {
        const token = req.header("Authorization");

        jwt.verify(token, process.env.ACCESSTOKENSECRET, (err, user) => {
            if(err){
                return res.status(500).json({msg: "Please Sign In"})
            }
            req.user = user;
            next()

        })
            
        
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
};

const customerMiddleware = async(req, res, next) => {
    if(req.user.role !== 'user'){
        return res.status(400).json({msg: "Access denied"})
    }
    next()
}
const adminMiddleware = async(req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(400).json({msg: "Access denied"})
    }
    next()
}

module.exports = {userMiddleware, customerMiddleware, adminMiddleware};