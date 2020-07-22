const mongoose = require("mongoose")

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
  },
  playlists: [
    {
      playlistname: {
        type: String,
        required: true,
      },
      playlist: [
        {
          movieurl: {
            type: String,
            required: true,
          },
        },
      ],
      datecreated: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  reviews: [
    {
      omdbmovieid: {
        type: String,
        required: true,
      },
      reviewtitle: {
        type: String,
        required: true,
      },
      reviewdescription: {
        type: String,
        required: true,
      },
      reviewrating: {
        type: Boolean,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
})

module.exports = Profile = mongoose.model("profile", ProfileSchema)
