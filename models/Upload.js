
const mongoose = require('mongoose')


const UploadScheme = new mongoose.Schema({
    uploadUrl: {
        type:String,
        required:true
    },
    previewUrl: {
        type:String,
        required:false,
        default: null
    },
    caption: {
        type:String,
        required:false
    },
    likes: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    tags: [{
        type:String,
        required:false
    }],
    is_video: {type:Boolean, default:false},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments"
    }]
})

const UploadModel = mongoose.model("uploads", UploadScheme)

module.exports = UploadModel
