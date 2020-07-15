const express = require("express")
const router = express.Router()
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const { check, validationResult } = require("express-validator")

const User = require("../../models/User")

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post("/", async (req, res) => {
  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ email })

    // See if user exists
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] })
    }

    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    })

    user = new User({
      name,
      email,
      avatar,
      password,
    })

    //Encrypt password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await user.save()

    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server error")
  }
})

module.exports = router
