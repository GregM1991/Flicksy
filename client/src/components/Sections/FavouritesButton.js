import React, { useContext } from "react"
import axios from "axios"
import UserContext from "../../context/UserContext"

export default function FavouritesButton(props) {
  const { userProfile, setUserProfile } = useContext(UserContext)
  const saveMovie = async (movieId) => {
    if (userProfile.playlists[1]) {
      const newMovie = {
        movieurl: movieId,
      }

      const token = localStorage.getItem("token")

      try {
        // Need to show if movie has been added to favourites
        const playlistId = userProfile.playlists[1]._id.toString()
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
        console.log(resMovie)
      } catch (error) {
        console.log(error.response)
      }
    }
  }

  return (
    <>
      <button onClick={() => saveMovie(props.movieId)}>
        Add to Favourites
      </button>
    </>
  )
}
