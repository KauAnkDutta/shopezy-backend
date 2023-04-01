const User = require("../model/userModel")
const bcrypt = require('bcrypt')
const {createAccessToken} = require('../middleware/util')

const userCtrl = {
    login: async(req, res) => {
        try {
            const {email, password} = req.body;

            const extUser = await User.findOne({email});
                if(!extUser){
                    return res.status(400).json({msg:"User Doesn't exist"})
                }
            
            const isMatch = await bcrypt.compare(password, extUser.password);
                if(!isMatch){
                    return res.status(400).json({msg: "Password doesn't match"})
                }

            const accessToken = createAccessToken({id: extUser._id, role: extUser.role});
            // const refreshToken = createRefereshToken({id: extUser._id, role: extUser.role});

                // res.cookie('refreshToken', refreshToken, {
                //     httpOnly: true,
                //     maxAge: 1 * 24 * 60 * 60 * 1000
                // })

                res.json({accessToken})

        } catch (error) {   
            res.status(500).json({msg: 'Requested Page Not Found'})
        }
    },

    register: async(req, res) => {
        try {
            const {name, email, mobile, password } = req.body;

            const passHash = await bcrypt.hash(password, 10)

            const newUser = User({
                name, 
                email,
                mobile,
                password: passHash
            });

            const extEmail = await User.findOne({email})            
            const extMobile = await User.findOne({ mobile })
                if(extEmail){
                    return res.status(400).json({msg: "Email Exist"})
                }else if(extMobile){
                    return res.status(400).json({msg: "Mobile Exist"})
                }
                
            await newUser.save()


            res.status(200).json({msg: 'User Registered Successfully'})
        } catch (error) {
            res.status(500).json({msg: 'Requested Page Not Found'})
        }
    },

    logout: async(req, res) => {
        try {
            res.clearCookie('refreshToken', {path: `/auth/refreshToken`})
            return res.status(400).json({msg: "LogOut successfull"})
        } catch (error) {
            res.status(500).json({msg: 'Requested Page Not Found'})
        }
    },

    getUser: async(req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password')
                if(!user){
                    return res.status(400).json({msg:"User Doesn't exist"})
                }
                res.json({'userInfo': user})
        } catch (error) {
            res.status(500).json({msg: 'Requested Page Not Found'})
        }
    },

    // refreshToken: async(req, res) => {
    //     try {
    //         const rToken = req.cookies.refreshToken;
    //             if(!rToken){
    //                 return res.status(400).json({msg:"Session expired, Login Again..."})
    //             }
            
    //         jwt.verify(rToken, config.refreshTokenSecret, (err, user) => {
    //             if(err){
    //                 return res.status(400).json({msg:"Session expired, login Again.."})
    //             }
                
    //             const accessToken = createAccessToken({id: user.id, role: user.role})
    //             res.json({accessToken})
    //         }) 

    //     } catch (error) {
    //         res.status(500).json({msg: 'Requested Page Not Found'})
    //     }
    // },

}

module.exports = userCtrl;