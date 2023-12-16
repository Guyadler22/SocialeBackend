

const mongoose = require('mongoose')


// User-Scheme
const UserScheme = new mongoose.Schema({
    email: {
        type: String,
        required:true,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    },
    password: {
        type: String,
        required:true,
        minLength: [6, "Password must be atleast 6 characters"],
    },
    name: {
        type: String,
        required:true,
    },
    image: {
        type:String,
        required:false,
        default: null
    },
    admin: {
        type:Boolean,
        default:false
    },
    country: {
        type: String
    },
    image: {
        type:String
    },
    uploads: [ { type:mongoose.Schema.Types.ObjectId, ref: "uploads" } ],
   
    birthday: {
        type: Date,
        required:true
    },

    Comment:{
        type:String
    },

    interests: [{type: String}]
},{
    versionKey:false
})

const UserModel = mongoose.model("users", UserScheme)

module.exports = UserModel