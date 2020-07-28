import React, { useContext } from "react"
import axios from "axios"
import UserContext from "../../context/UserContext"

export default function FavouritesButton(props) {
  const { userProfile, setUserProfile } = useContext(UserContext)
  const saveMovie = async (movieId) => {
    if (userProfile.playlists[0]) {
      const newMovie = {
        movieurl: movieId,
      }

      const token = localStorage.getItem("token")

      try {
        const playlistId = userProfile.playlists[0]._id.toString()
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
        const body = JSON.stringify(newMovie)
        const resMovie = await axios.put(
          `/api/profile/playlist/${playlistId}/movie`,
          body,
          config
        )
        setUserProfile(resMovie.data)
      } catch (error) {
        console.log(error.response)
      }
    }
  }

  return (
    <>
      <button onClick={() => saveMovie(props.movieId)}>Add to Watchlist</button>
    </>
  )
}
