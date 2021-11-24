const router = require('express').Router()
const User = require('../models/Users')
const Post = require('../models/Posts')
const Category = require('../models/Categories')


router.post('/createcategory',async (req,res)=>{
    const newCat=new Category(req.body)
    try {
        const savedCat=await newCat.save()
        res.status(200).json(savedCat)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/getcategory',async (req,res)=>{
    try {
        const gotCategory=await Category.find()
        res.status(200).json(gotCategory)
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router