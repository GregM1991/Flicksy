import React, { useEffect, useState } from "react"
import { API_URL, API_KEY, IMG_URL } from "../Config"
import axios from "axios"

import SingleMovie from "../Sections/SingleMovie"

export const Landing = () => {
  const [Movies, setMovies] = useState([])

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

  // setMovieList(getMovie())

  useEffect(() => {
    getMovies()
  }, [])

  // const movieList = getMovie()
  // console.log(movieList)

  return (
    <>
      <div></div>
      {Movies.map((movie, index) => {
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
