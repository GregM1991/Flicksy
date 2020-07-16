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
          omdbmovieid: {
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
})

module.exports = Profile = mongoose.model("profile", ProfileSchema)
