

const { get } = require('mongoose')
const Upload = require('../models/Upload')
const User  = require('../models/User')
//const Comment = require('../models/Comment')
const utils = require('../utils')


const sign_up = async (userDetails) => {
     userDetails.email = userDetails.email.toLowerCase()
     const existingUser = await User.findOne({ email:userDetails.email})
     // check if email already in-use
     if(existingUser) {
        throw new Error("Email already in use")
     }
     userDetails.password = utils.hashPassword(userDetails.password)
     // create new user  
     const newUser = await User.create(userDetails)
     // generate token
     return utils.generate_token(newUser._id)
}

const sign_in = async (userDetails) => {
    userDetails.email = userDetails.email.toLowerCase()
    // check if user exists by email
    const existingUser = await User.findOne({ email:userDetails.email })
    if(!existingUser) {
        throw new Error("No user with given email")
    }
    // hash the password
    const hashed = utils.hashPassword(userDetails.password)

    if(existingUser.password !== hashed) {
        throw new Error("Wrong email/password entered")
    }

    return utils.generate_token(existingUser._id)
}

const get_user_by_id = async (id) => {
    const user = await User.findById(id)
    .populate({
        path: "uploads",
        populate: [{
            path: 'comments',
            model: 'comments',
            populate: {
                path: "user",
                select:["_id", "email","admin", "name", "image"],
                model: "users"
            }
        },
        {
            path: 'likes',
            model: 'users',
            select:["_id", "email","admin", "name", "image"],
        }
    ]
    })
    return user
}

const get_user_by_id_naked = async (id) => {
    const user = await User.findById(id)
    return user

}




module.exports = { 
    sign_up,
    sign_in,
    get_user_by_id,
    get_user_by_id_naked,
}
