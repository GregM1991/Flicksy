import React, { useEffect, useState, useContext } from "react"
import axios from "axios"
import { API_URL, API_KEY, IMG_URL } from "../Config"
import UserContext from "../../context/UserContext"
const ViewMovie = (props) => {
  const { setUserData, setUserProfile, userProfile } = useContext(UserContext)
  const [getMovie, setGetMovie] = useState("")
  const movieId = props.match.params.movieId
  useEffect(() => {
    try {
      ;(async () => {
        const response = await axios.get(
          `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`
        )
        console.log(response)
        setGetMovie(response.data)
      })()
    } catch (e) {
      console.log(e)
    }
  }, [movieId])

  return (
    <div>
      <div>
        {userProfile.playlists.map((playlist) => (
          <div key={playlist.playlistname}>{playlist.playlistname}</div>
        ))}
      </div>
      <div
        style={{
          backgroundImage: `url(${IMG_URL}w400${getMovie.backdrop_path})`,
          width: "100%",
          height: "100px",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div>{getMovie.title}</div>
      <div>{getMovie.overview}</div>
      <div>{getMovie.runtime} mins</div>
      <div>Release date: {getMovie.release_date}</div>
      <div>Rating: {getMovie.vote_average}</div>
    </div>
  )
}

export default ViewMovie
