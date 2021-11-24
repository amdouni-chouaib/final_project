const router = require('express').Router()
const User = require('../models/Users')
const Post = require('../models/Posts')

//create post -api
router.post('/createpost', async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).send(error)
    }
})


//update post - api
router.put('/updatepost/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (req.body.username === post.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true })
                res.status(200).json(updatedPost)
            } catch (error) {
                res.status(500).json(error)
            }
        }
        else {
            res.status(500).send("You can only update Your post")
        }
    } catch (error) {
        res.status(500).send(error)
    }

})


//update post - api
router.delete('/deletepost/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (req.body.username === post.username) {
            try {
                await Post.findByIdAndDelete(req.params.id)
                res.status(200).send("Post deleted successfully")
            } catch (error) {
                res.status(500).json(error)
            }
        }
        else {
            res.status(500).send("You can only delete Your post")
        }
    } catch (error) {
        res.status(500).send(error)
    }

})


//get post- api
router.get('/getpost/:id', async (req, res) => {
    try {
        const gotPost = await Post.findById(req.params.id)
        res.status(200).json(gotPost)
    } catch (error) {
        res.status(500).send(error)
    }
}
)

//get all posts- api
router.get('/', async (req, res) => {
    const username = req.query.user
    const cateName = req.query.cat
    try {

        let posts;
        if (username) {
            posts = await Post.find({ username: username })
        }
        else if (cateName) {
            posts = await Post.find({
                categories: {
                    $in: [cateName]
                },
            })
        }
        else {
            posts = await Post.find()
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).send(error)
    }
}
)

module.exports = router