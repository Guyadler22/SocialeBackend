const express = require('express')
const dotenv = require('dotenv')
const userRouter = require('./routes/user_route')
const uploadRouter = require('./routes/upload_route')

dotenv.config()
const fs = require('fs')

// make public a static directory
// so we can access files that are on server from the browser

const app = express()

app.use(express.urlencoded({extended: false, limit:'50mb'}))
app.use(express.json())

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));
app.use('/user-uploads', uploadRouter)
app.use("/users", userRouter)


const PORT = process.env.SERVER_PORT || 8080

app.listen(PORT, async () => {
    console.log("Server listening on port " + PORT)
    require('./db')
})

