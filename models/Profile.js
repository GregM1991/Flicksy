const mongoose = require("mongoose")

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  playlists: [
    {
      playlist: [
        {
          movietitle: {
            type: String,
          },
          moviedate: {
            type: Number,
          },
          movieruntime: {
            type: Number,
          },
          moviecontentrating: {
            type: String,
          },
          moviegenre: [
            {
              genre: {
                type: String,
              },
            },
          ],
          rating: {
            type: Number,
          },
          userrating: {
            type: Number,
          },
          director: {
            type: String,
          },
          actors: [
            {
              name: {
                type: String,
              },
            },
          ],
          description: {
            type: String,
          },
        },
      ],
    },
  ],
})

module.exports = Profile = mongoose.model("profile", ProfileSchema)
