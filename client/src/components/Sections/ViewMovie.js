import React, { useEffect, useState, useContext } from "react"
import axios from "axios"
import { API_URL, API_KEY, IMG_URL } from "../Config"
import UserContext from "../../context/UserContext"
const ViewMovie = (props) => {
  const { userProfile } = useContext(UserContext)

  const [getMovie, setGetMovie] = useState("")
  const [Actors, setActors] = useState("")

  const [Toggle, setToggle] = useState(false)

  const movieId = props.match.params.movieId

  async function getActors() {
    const respond = await axios.get(
      `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
    )
    console.log(respond.data)
    setActors(respond.data)
  }

  async function getMovieDetails() {
    const response = await axios.get(
      `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`
    )
    setGetMovie(response.data)
  }
  useEffect(() => {
    getMovieDetails()
    getActors()
  }, [movieId])

  const handleClick = () => {
    setToggle(!Toggle)
  }
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

      <div>
        <button onClick={handleClick}>Show actors</button>
      </div>

      {Toggle && (
        //only when the button is toggle then it will show the actors
        <div>
          {Actors &&
            Actors.cast.map(
              (actor) =>
                //check if actor have a picture, if not wont render out
                actor.profile_path && (
                  <div key={actor.cast_id}>
                    <div
                      style={{
                        backgroundImage: `url(${IMG_URL}w400${actor.profile_path})`,
                        width: "100%",
                        height: "400px",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                    <div>{actor.name}</div>
                    <div>As {actor.character}</div>
                  </div>
                )
            )}
        </div>
      )}
    </div>
  )
}

export default ViewMovie
