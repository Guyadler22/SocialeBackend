
const utils = require('../utils')
const User = require('../models/User')

async function adminMiddlware(req, res, next) {
    if(!utils.validateTokenRequest(req,res)) {
        return;
    } else {
        try {
            const user = await User.findById(req.user)
            if(user.admin) return next()
            throw user
        } catch(e) {
            res.status(401).json({
                message:"Unauthorized request",
                data:null
            })
        }
    }
}

module.exports = adminMiddlware