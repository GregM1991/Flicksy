import React, { useEffect, useState, useContext } from "react"
import axios from "axios"
import { API_URL, API_KEY, IMG_URL } from "../Config"
import UserContext from "../../context/UserContext"
import FavouritesButton from "./FavouritesButton"
import WatchlistButton from "./WatchlistButton"
const ViewMovie = (props) => {
  const { userProfile } = useContext(UserContext)
  // Sets state
  const [getMovie, setGetMovie] = useState("")
  const [Actors, setActors] = useState("")
  const [Toggle, setToggle] = useState(false)
  // grabs movie from params
  const movieId = props.match.params.movieId
  // Grabs actors from API
  async function getActors() {
    const respond = await axios.get(
      `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
    )
    console.log(respond.data)
    setActors(respond.data)
  }
  // Gets movie details, sets to state
  async function getMovieDetails() {
    const response = await axios.get(
      `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`
    )
    console.log(response.data)
    setGetMovie(response.data)
  }
  useEffect(() => {
    getMovieDetails()
    getActors()
  }, [movieId])

  const isInPlaylist = () => {
    console.log(userProfile)
    const movieArr = userProfile.playlists[1].playlist.filter(
      (movie) => movie.movieurl === movieId
    )
    console.log(movieArr)
    // if (movieArr.length > 0)
  }

  const handleClick = () => {
    setToggle(!Toggle)
  }
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${IMG_URL}w200${getMovie.poster_path})`,
          width: "auto",
          height: "300px",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <h1>{getMovie.title}</h1>
      <p>{getMovie.overview}</p>
      <span>{getMovie.runtime} mins</span>
      <span>Release date: {getMovie.release_date}</span>
      <span>Rating: {getMovie.vote_average}</span>
      {isInPlaylist() ? (
        <FavouritesButton movieId={movieId} />
      ) : (
        <button>Added to Playlist</button>
      )}
      {isInPlaylist() ? (
        <WatchlistButton movieId={movieId} />
      ) : (
        <button>Added to Watchilst</button>
      )}

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
