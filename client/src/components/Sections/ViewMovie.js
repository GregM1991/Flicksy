import React, { useEffect, useState, useContext } from "react"
import axios from "axios"
import { API_URL, API_KEY, IMG_URL } from "../Config"
import UserContext from "../../context/UserContext"
const ViewMovie = (props) => {
  const { userProfile } = useContext(UserContext)
  const [getMovie, setGetMovie] = useState("")

  const [Crews, setCrews] = useState([])
  const movieId = props.match.params.movieId
  // async () =>{
  //   const res = await axios.get(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
  // console.log(res)
  // } 
  
  async function getMovieDetails(){
    const response = await axios.get(
      `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`
    )
    console.log(response)
    setGetMovie(response.data)
  }
  useEffect(() => {
    getMovieDetails()
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

      <div>
        <button>Show actors</button>
      </div>

    </div>
  )
}

export default ViewMovie
