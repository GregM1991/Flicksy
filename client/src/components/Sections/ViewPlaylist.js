import React, { useContext, useState, useEffect } from "react"
import UserContext from "../../context/UserContext"
import SingleMovie from "./SingleMovie"
import axios from "axios"
import { API_URL, API_KEY, IMG_URL } from "../Config"

export default function ViewPlaylist(props) {
  const { userProfile } = useContext(UserContext)
  const [Movies, setMovies] = useState([])
  const playlistName = userProfile.playlists.find(
    (playlist) => playlist._id.toString() === props.match.params.playlistId
  ).playlistname
  console.log(playlistName)
  const currentPlaylist = userProfile.playlists.find(
    (playlist) => playlist._id.toString() === props.match.params.playlistId
  ).playlist
  console.log(currentPlaylist)
  useEffect(() => {
    async function getMovies() {
      const moviePromises = currentPlaylist.map(async (m) => {
        return {
          ...(
            await axios.get(
              `${API_URL}movie/${m.movieurl}?api_key=${API_KEY}&language=en-US`
            )
          ).data,
          mongoId: m._id,
        }
      })
      setMovies(await Promise.all(moviePromises))
    }
    getMovies()
  }, [])

  const deleteMovie = async (movieId) => {
    try {
      console.log(movieId)
      const playlistId = props.match.params.playlistId
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          "x-auth-token": token,
        },
      }
      const res = await axios.delete(
        `/api/profile/playlist/${playlistId}/${movieId}`,
        config
      )
      console.log(res)
      setMovies(Movies.filter((m) => m.mongoId !== movieId))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h1>{playlistName}</h1>
      <div>
        {Movies.map((movie) => {
          return (
            <div key={movie.mongoId}>
              <SingleMovie
                key={movie.id}
                image={`${IMG_URL}w200${movie.poster_path}`}
                title={movie.original_title}
                text={movie.overview}
                movieId={movie.id}
              />
              <button onClick={() => deleteMovie(movie.mongoId)}>
                Delete Movie
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}
