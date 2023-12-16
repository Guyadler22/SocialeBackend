

const Upload = require('../models/Upload')
const Comment = require('../models/Comment')
const userController = require('./user_controller')
// Create comment
const create_comment = async (commenterId, uploadId, content) => {
    const comment = await Comment.create({
        // the user who commented on the upload
        user: commenterId,
        // the id of the upload
        upload: uploadId,
        created_at: Date.now(),
        // content of the comment
        content 
    })
    const upload = await Upload.findById(uploadId)
    upload.comments.push(comment._id)
    upload.save()
    return comment
}


const save_image_for_user = async (userId, imageSrc, uploadData) => {
    const user = await userController.get_user_by_id(userId)
    const upload = await Upload.create({
        user: userId,
        uploadUrl: imageSrc,
        ...uploadData
    })
    user.uploads.push(upload)
    user.save()
    return user
} 

const save_user_profile_image = async (userId, imageSrc) => {
    const user = await userController.get_user_by_id(userId)
    user.image = imageSrc
    user.save()
    return user
} 


const likeUpload = async (userId, uploadId, likeTrue) => {
    const upload = await Upload.findById(uploadId)
    if (likeTrue) {
        upload.likes.push(userId) 
    } else { // remove the user from upload likes
        upload.likes = upload.likes.filter(user => user.toString() !== userId)
    }
    return await upload.save()
}

const getAllUploads = async () => {
    const uploads = await Upload.find({})
    .populate({
        path: "user",
        model:"users",
        select:["_id", "email","admin", "name", "image"],
    }).populate({
        path: 'comments',
        model: 'comments',
        populate: {
            path: "user",
            select:["_id", "email","admin", "name", "image"],
            model: "users"
        }
    }).populate({
        path: "likes", 
        select:["_id", "email","admin", "name", "image"],
        model: "users"
    })
    return uploads
}


module.exports = { 
    create_comment,
    save_image_for_user,
    save_user_profile_image,
    getAllUploads,
    likeUpload
}
