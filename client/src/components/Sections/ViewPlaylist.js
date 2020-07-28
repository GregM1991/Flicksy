import React, { useContext, useState, useEffect } from "react"
import UserContext from "../../context/UserContext"
import SingleMovie from "./SingleMovie";
import axios from "axios"
import { API_URL, API_KEY, IMG_URL } from "../Config"

export default function ViewPlaylist(props) {
  const { userProfile } = useContext(UserContext)
  const [Movies, setMovies] = useState([])

  const currentPlaylist = userProfile.playlists
    .find(
    (playlist) => playlist._id.toString() === props.match.params.playlistId).playlist

      console.log(currentPlaylist);
      useEffect(() => {
        async function getMovies(){
          const moviePromises = currentPlaylist.map(m => axios.get(`${API_URL}movie/${m.movieurl}?api_key=${API_KEY}&language=en-US`))
          setMovies((await Promise.all(moviePromises)).map(res => res.data))
        }
        getMovies()
      },[])
      
      console.log(Movies);
  return (
    <>
      <h1>Playlist</h1>
      <div>
      {Movies.map(movie =>{
        return (
          <SingleMovie
            key={movie.id}
            image={`${IMG_URL}w200${movie.poster_path}`}
            title={movie.original_title}
            text={movie.overview}
            movieId={movie.id}
          />
        )
      })}
         
      </div>
     </>    
   
  )
}
