

const mongoose = require('mongoose')


const CommentScheme = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    upload: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "uploads",
    },
    created_at: {
        type: Number,
    }
})



const CommentModel = mongoose.model("comments", CommentScheme)

module.exports = CommentModel