const multer = require('multer')

const fs = require('fs')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(!fs.existsSync(`./public/uploads/${req.user_id}`)) {
        fs.mkdirSync(`./public/uploads/${req.user_id}`)
      }
      req.imageSrc = `http://127.0.0.1:8080/uploads/${req.user_id}/${file.originalname}`
      
      cb(null, `./public/uploads/${req.user_id}`)
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage, limits: {fieldSize: 1024 * 50 * 1024}})


module.exports = upload