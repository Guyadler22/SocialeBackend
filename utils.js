
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const ffmpeg = require('fluent-ffmpeg')

dotenv.config()


function hashPassword (password) {
    const hash = crypto.createHash('sha1')
    hash.update(password)
    return hash.digest('hex')
}


function generate_token(user_id) {

    const token = jwt.sign({ user_id }, process.env.SECRET_KEY, { expiresIn: '2h' })

    return token
}

function decode_token(token) {

    const { user_id } = jwt.decode(token)

    return user_id
}


const validateTokenRequest = (req, res) => {
    try {
        const auth_header = req.headers["Authorization"] || req.headers["authorization"] 
        let token = auth_header.split("Bearer ")[1]
        const user_id = decode_token(token)
        req.user_id = user_id
        return true
    } catch(e) {
        res.status(401).json({
            message:"Unauthorized request",
            data:null
        })
        return false
    }
}



const capture_video_snapshot = async (userId,  videoSrc, postBody) => {
    return new Promise((resolve, reject) => {
        try { 
            const previewId = crypto.randomUUID()
           ffmpeg(videoSrc)
            .takeScreenshots({
                count: 1,
                filename: previewId,
                timemarks: [ '1' ] // number of seconds
              }, `./public/uploads/${userId}/`);
            resolve(`http://127.0.0.1:8080/uploads/${userId}/${previewId}.png`)  
        } catch (e) {
            console.log(e)
            reject("Could not upload preview")
        }
       
    })
}

module.exports = { hashPassword, generate_token,capture_video_snapshot, decode_token,validateTokenRequest }