
const userController = require('../controllers/user_controller')
const verified = require('../middleware/validateTokenMiddleware')
const utils = require('../utils')
const express = require('express'), router = express.Router()

const upload = require('../upload')

// BODY: {name:string,gender:string, email:string, password:string ,birthday:string }
router.post("/sign-up", async (req, res) => {
    
    try {
        const token = await userController.sign_up(req.body)
        res.status(201).json({
            message:"New user created!",
            data: token
        })
    } catch(e) {
        res.status(400).json({
            message:e.message,
            data:null
        })
    }
})


router.post("/sign-in", async (req,res) => {
    try {
        const token = await userController.sign_in(req.body)
        res.status(201).json({
            message:"Sign in successfully!",
            data:token
        })
    } catch(e) {
        res.status(400).json({
            message:e.message,
            data:null
        })
    }
})


router.get("/me", verified, async (req,res) => {
    const id = req.user_id
    try {
        const user = await userController.get_user_by_id(id)
        res.status(201).json({
            message:"user fetched successully",
            data: user
        })
    } catch(e) {
        res.status(400).json({
            message:e.message,
            data:null
        })
    }
})





module.exports = router
