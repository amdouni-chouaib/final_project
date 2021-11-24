const router = require('express').Router()
const User = require('../models/Users')
const bcrypt = require('bcrypt')

//update user -api
router.put('/updateuser/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        //if passw is said to be updated,we have to hash again, if others they are updated by set
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true })//new:true must be done to get updated response
            res.status(200).send(updatedUser)
        } catch (error) {
            res.status(200).send(error)
        }
    }
    else {
        res.status(401).send("You can only update your account")
    }
})


//delete user- api
router.delete('/deleteuser/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).send("User has been deleted")
        } catch (error) {
            res.status(500).send(error)
        }
    }
    else {
        res.status(401).send("You can only delete your account")
    }
})


//get user- api
router.get('/getuser/:id', async (req, res) => {
        try {
            const gotUser=await User.findById(req.params.id)
            const {password,...others}=gotUser._doc
            res.status(200).json(others)
        } catch (error) {
            res.status(500).send(error)
        }
    }
)

module.exports =router