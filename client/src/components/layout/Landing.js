import React, { useEffect, useState } from "react"
import { API_URL, API_KEY, IMG_URL } from "../Config"
import axios from "axios"
import SingleMovie from "../Sections/SingleMovie"
import SearchMovie from "../Sections/SearchMovie"

export const Landing = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function getMovies() {
      try {
        const res = await axios.get(
          `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        )
        setMovies(res.data.results)
        console.log(res.data.results)
      } catch (err) {
        console.log(err)
      }
    }

    getMovies()
  }, [])

  return (
    <>
    <SearchMovie/>  
      {movies.map((movie) => {
        return (
          <SingleMovie
            key={movie.id}
            image={`${IMG_URL}w400${movie.backdrop_path}`}
            title={movie.original_title}
            text={movie.overview}
            movieId={movie.id}
          />
        )
      })}
    </>
  )
}
