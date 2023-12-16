
const express = require('express'), router = express.Router()

const uploadController = require('../controllers/upload_controller')
const verified = require('../middleware/validateTokenMiddleware')
const utils = require('../utils')
const upload = require('../upload')



router.get("/", async (req,res) => {
    
    try {
        const uploads = await uploadController.getAllUploads()
        return res.status(200).send({
            message: `All uploads`,
            data: uploads
        })  
    } catch(e) {
        return res.status(500).send({
            message: e.message,
            data: null
        })  
    }
})


router.post("/upload-image/", verified, upload.single('image'), async (req,res) => {
    if(!req.file) {
        return res.status(500).send({
            message: "Could not save file",
            data: null
        })
    } else {
        try {
            let postBody = JSON.parse(req.body.postBody)
            if (postBody.is_video) {
                const previewUrl = await utils.capture_video_snapshot(
                    req.user_id,
                    req.imageSrc,
                    postBody
                )
                postBody.previewUrl = previewUrl
            }
            const user_after_save = await uploadController.save_image_for_user(
                req.user_id,
                req.imageSrc,
                postBody // { caption,tags..}
                )
            return res.status(200).send({
                message: `File Created!`,
                data: user_after_save
            })     
        } catch(e) {
            return res.status(400).send({
                message: e.message,
                data: null
            })    
        }
    }
})


router.post("/upload-profile-image/", verified, upload.single('image'), async (req,res) => {
    if(!req.file) {
        return res.status(500).send({
            message: "Could not save file",
            data: null
        })
    } else {
        try {
            const user_after_save = await uploadController.save_user_profile_image(
                req.user_id,
                req.imageSrc,
            )
            return res.status(200).send({
                message: `Profile image saved!`,
                data: user_after_save
            })     
        } catch(e) {
            return res.status(400).send({
                message: e.message,
                data: null
            })    
        }
    }
})

router.post("/like/:uploadId", verified, async (req,res) => {
    try {
        const likedTrue = req.body.likedTrue
        console.log(likedTrue)
        const upload = await uploadController.likeUpload(
            req.user_id,
            req.params.uploadId,
            likedTrue)

        return res.status(201).send({
            message: "like updated successfully",
            data: ""
        })  
    } catch(e) {
        return res.status(400).send({
            message: e.message,
            data: null
        })   
    }
})


// for comment delete
// router.delete() // '/comment/:uploadId/:commentid'

router.post("/comment/:uploadId", verified, async (req,res) => {
    try {
        const comment = await uploadController.create_comment(
            req.user_id,
            req.params.uploadId,
            req.body.content
        )

        return res.status(201).send({
            message: "comment created successfully",
            data: comment
        })  
    } catch(e) {
        return res.status(400).send({
            message: e.message,
            data: null
        })   
    }
})

module.exports = router