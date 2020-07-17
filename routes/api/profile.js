const express = require("express")
const request = require("request")
const config = require("config")
const router = express.Router()
const auth = require("../../middleware/auth")
const { check, validationResult } = require("express-validator")

const Profile = require("../../models/Profile")
const User = require("../../models/User")


// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.body.user.id,
    }).populate("user", ["name", "avatar"])

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" })
    }
    res.json(profile)
  } catch (error) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// @route   POST api/profile/me
// @desc    Create or update a user profile
// @access  Private
router.post("/", auth, async (req, res) => {
  const { name } = req.body

  const profileFields = {}
  profileFields.user = req.user.id
  if (name) profileFields.name = name

  try {
    let profile = await Profile.findOne({ user: req.user.id })
    console.log(req.user.id)

    // @todo: Change the user to user_id for clarity
    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      )
      console.log("profile updated")
      return res.json(profile)
    }

    // Create
    profile = new Profile(profileFields)

    await profile.save()
    console.log("New profile saved")
    res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

// @route   DELETE api/profile
// @desc    Delete profile & user
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id })
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id })

    res.json({ msg: "User Deleted" })
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

module.exports = router
