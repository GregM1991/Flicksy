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

  const isInFavouritesPlaylist = () => {
    const movieArr = userProfile.playlists[1].playlist.filter(
      (movie) => movie.movieurl === movieId
    )
    if (movieArr.length > 0) {
      return true
    } else {
      return false
    }
  }

  const isInWatchlistPlaylist = () => {
    const movieArr = userProfile.playlists[0].playlist.filter(
      (movie) => movie.movieurl === movieId
    )
    if (movieArr.length > 0) {
      return true
    } else {
      return false
    }
  }

  const handleClick = () => {
    setToggle(!Toggle)
  }
  return (
    <>
      <div
        className="view-movie-image"
        style={{
          backgroundImage: `url(${IMG_URL}w400${getMovie.poster_path})`,
        }}
      ></div>

      <h1 className="view-movie-title">{getMovie.title}</h1>
      <p className="view-movie-description">{getMovie.overview}</p>
      <div className="secondary-info">
        <span className="view-movie-runtime">{getMovie.runtime} mins</span>
        <span className="view-movie-span">
          Released: {getMovie.release_date}
        </span>
        <span className="view-movie-span">Rating: {getMovie.vote_average}</span>
      </div>
      <div className="view-movie-buttons">
        {isInFavouritesPlaylist() ? (
          <button class="button">Added to Favourites</button>
        ) : (
          <FavouritesButton movieId={movieId} />
        )}
        {isInWatchlistPlaylist() ? (
          <button class="button">Added to Watchilst</button>
        ) : (
          <WatchlistButton movieId={movieId} />
        )}
      </div>

      <button className="button view-actors-button" onClick={handleClick}>
        Show actors
      </button>

      {Toggle && (
        //only when the button is toggle then it will show the actors
        <div className="actors">
          {Actors &&
            Actors.cast.map((actor) => (
              <span key={actor.cast_id}>{actor.name}, </span>
            ))}
        </div>
      )}
    </>
  )
}

export default ViewMovie
