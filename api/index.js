const express = require('express')
const multer=require('multer')
var bodyParser = require('body-parser');
const path=require('path')
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));  //if i get an empty array as 
// response, so used bodyparser
app.use(bodyParser.json());

// MAKING IMAGES FOLDER PUBLIC TO USE
app.use('/images',express.static(path.join(__dirname,'/images')))

//cors policy
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

//imports for routes
const authroute = require('./routes/auth')
const userroute = require('./routes/user')
const postroute = require('./routes/post')
const catroute = require('./routes/category')

// const dotenv = require('dotenv')
const Mongoose = require('mongoose')

MONGO_URL = "mongodb+srv://chouaib:136891@blog.dgz17.mongodb.net/blogging?retryWrites=true&w=majority"
// dotenv.config()
 
Mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => { console.log("Mongodb connected") }).catch((err) => console.log(err))

//routes for router
app.use('/api/auth', authroute)
app.use('/api/users', userroute)
app.use('/api/posts', postroute)
app.use('/api/categories', catroute)

app.use(express.json())
//admin bro model
const Admin = require('./models/Admin')
const cat = require('./models/Categories')
const Posts = require('./models/Posts')
const Users = require('./models/Users')


AdminBro.registerAdapter(AdminBroMongoose)
const AdminBroOptions = {
  resources: [ Posts, Users],
}

const adminBro = new AdminBro(AdminBroOptions)
const router = AdminBroExpress.buildRouter(adminBro)

app.use(adminBro.options.rootPath, router)












//code for file upload using multer
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})

const upload=multer({storage:storage})

app.post('/api/upload',upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded")

})

//running the app
app.listen('5000', () => {
    console.log("Backend server is running")
})