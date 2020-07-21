import React, { useEffect, useState } from "react"
import { API_URL, API_KEY, IMG_URL } from "../Config"
import axios from "axios"

import MainImg from "../Sections/MainImg"

export const Landing = () => {
  const [Movies, setMovies] = useState([])

  async function getMovies() {
    try {
      const res = await axios.get(
        `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      )
      console.log(res)
      setMovies(res.data.results)
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
      {Movies.map((movie) => {
        return (
          <MainImg
            image={`${IMG_URL}w400${movie.backdrop_path}`}
            title={movie.original_title}
            text={movie.overview}
          />
        )
      })}
    </>
  )
}
