
// mongoose - db
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const User = require('./models/User')
const Upload = require('./models/Upload')
const Comment = require('./models/Comment')
const fs = require('fs')
const path = require('path')
dotenv.config()


const deleteAllUploads =() => {
    const dir = path.join(path.join(__dirname, 'public'), 'uploads')
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error("Error reading directory:", err);
            return;
        }
    
        for (let uploadFolder of files) {
            const userUploadsFolderPath = path.join(dir, uploadFolder);
    
            const uploadFiles = fs.readdirSync(userUploadsFolderPath);
            for (let upload of uploadFiles) { 
                const userUpload = path.join(userUploadsFolderPath, upload);
                fs.unlinkSync(userUpload); // Remove files synchronously
            }
    
            fs.rmdirSync(userUploadsFolderPath); // Remove the directory after files are deleted
        }
    });
}

mongoose.connect(process.env.DATABASE_URI)
.then(async () =>{
    console.info("Database connected")
    if(process.env.NODE_ENV === 'development') {
        //await User.deleteMany({})
        await Upload.deleteMany({})
        await Comment.deleteMany({})
        deleteAllUploads()
        console.info("Cleared databsae")
    }
 
})
.catch(console.error)



module.exports = mongoose