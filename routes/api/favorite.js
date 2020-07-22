const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth")

// const { check, validationResult } = require("express-validator")

const Favorite = require("../../models/Favorite")

router.post("/favoriteNumber", (req, res) => {
    Favorite.find({"movieId": req.body.movieId})
    .exec((err, favorite) =>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success: true, favoriteNumber: favorite.length})
    })
})

router.post("/favorited",auth, (req, res) => {
    console.log(req.user);
    const 
})


module.exports = router
