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
      user: req.user.id,
    }).populate("user", ["name", "avatar"])

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" })
    }
    res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

// @route   POST api/profile
// @desc    Create or update a user profile
// @access  Private
router.post(
  "/",
  [auth, check("name", "Please input a name").not().isEmpty()],
  async (req, res) => {
    const { name } = req.body

    const profileFields = {}
    profileFields.user = req.user.id
    if (name) profileFields.name = name

    try {
      let profile = await Profile.findOne({ user: req.user.id })
      console.log(req.user.id)

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
      profileFields.playlists = [
        { playlistname: "watchlist" },
        { playlistname: "favourites" },
      ]
      profile = new Profile(profileFields)

      await profile.save()
      console.log("New profile saved")
      res.json(profile)
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Server Error")
    }
  }
)

// @route   PUT api/profile/review
// @desc    Add profile review
// @access  Private
router.put(
  "/reviews",
  [auth, check("title", "Please input a title").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(res)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { title } = req.body

    const newReview = { title }

    try {
      const profile = await Profile.findOne({ user: req.user.id })

      profile.reviews.unshift(newReview)

      await profile.save()

      res.json(profile)
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Server Error")
    }
  }
)

// @route   DELETE api/profile/playlist/:pl_id
// @desc    Delete a profile playlist
// @access  Private
router.delete("/review", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    // Get remove index
    const removeIndex = profile.reviews
      .map((item) => item.id)
      .indexOf(req.params.pl_id)

    profile.reviews.splice(removeIndex, 1)

    await profile.save()

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

// @route   PUT api/profile/playlist
// @desc    Add profile playlist
// @access  Private
router.put(
  "/playlist",
  [auth, check("playlistname", "Please input a playlist name").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(res)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { playlistname } = req.body
    const newPlaylist = { playlistname }

    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.playlists.unshift(newPlaylist)

      await profile.save()
      res.json(profile)
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Server Error")
    }
  }
)

// @route   GET api/profile/playlist/:pl_id
// @desc    Show a profile playlist
// @access  Private
router.get("/playlist/:pl_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    playlist = profile.playlists.filter(
      (playlist) => playlist._id.toString() === req.params.pl_id
    )
    res.json(playlist)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

// @route   DELETE api/profile/playlist/:pl_id
// @desc    Delete a profile playlist
// @access  Private
router.delete("/playlist/:pl_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    // Get remove index
    const removeIndex = profile.playlists
      .map((item) => item.id)
      .indexOf(req.params.pl_id)

    profile.playlists.splice(removeIndex, 1)

    await profile.save()

    res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

// @route   PUT api/profile/:pl_id/movie
// @desc    Add movie to playlist
// @access  Private
router.put(
  "/playlist/:pl_id/movie",
  [auth, check("movieurl", "Movie required a URL").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(res)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { movieurl } = req.body

    const newMovie = { movieurl }

    try {
      const profile = await Profile.findOne({ user: req.user.id })
      const plIndex = profile.playlists
        .map((item) => item.id)
        .indexOf(req.params.pl_id)
      profile.playlists[plIndex].playlist.unshift(newMovie)

      await profile.save()

      res.json(profile)
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Server Error")
    }
  }
)

// @route   DELETE api/profile/:pl_id/:mv_id
// @desc    Delete a movie from playlist
// @access  Private
router.delete("/playlist/:pl_id/:mv_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    const playlistIndex = profile.playlists
      .map((playlist) => playlist.id)
      .indexOf(req.params.pl_id)
    // Get remove index
    const removeIndex = profile.playlists[playlistIndex].playlist
      .map((movie) => movie.id)
      .indexOf(req.params.mv_id)

    profile.playlists[playlistIndex].playlist.splice(removeIndex, 1)

    await profile.save()

    res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

// @route   PUT api/profile/review
// @desc    Add profile review
// @access  Private
router.put(
  "/reviews",
  [
    auth,
    [
      check("reviewdescription", "Please input a description").not().isEmpty(),
      check("reviewtitle", "Please input a title").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(res)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { omdbmovieid, reviewtitle, reviewdescription } = req.body

    const newReview = { omdbmovieid, reviewtitle, reviewdescription }

    try {
      const profile = await Profile.findOne({ user: req.user.id })

      profile.reviews.unshift(newReview)

      await profile.save()

      res.json(profile)
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Server Error")
    }
  }
)

// @route   DELETE api/profile/reviews/:reviews_id
// @desc    Delete a profile review
// @access  Private
router.delete("/reviews/:reviews_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    // Get remove index
    const removeIndex = profile.reviews
      .map((review) => review.id)
      .indexOf(req.params.reviews_id)

    profile.reviews.splice(removeIndex, 1)

    await profile.save()

    res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

// @route   PUT api/profile/reviews/:reviews_id
// @desc    Delete a profile review
// @access  Private
router.put("/reviews/:reviews_id", auth, async (req, res) => {
  const { reviewtitle, reviewdescription } = req.body

  const reviewFields = {}
  if (reviewtitle) reviewFields.reviewtitle = reviewtitle
  if (reviewdescription) reviewFields.reviewdescription = reviewdescription

  try {
    // Update
    const profile = await Profile.findOne({ user: req.user.id })

    const updatedReviews = profile.reviews.map((review) => {
      console.log(review)
      if (review._id.toString() === req.params.reviews_id) {
        review.reviewtitle = reviewtitle || review.reviewtitle
        review.reviewdescription = reviewdescription || review.reviewdescription
      }
      return review
    })

    if (profile) {
      profile.reviews = updatedReviews
      profile.save()
    }

    console.log("profile updated")
    return res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

module.exports = router
