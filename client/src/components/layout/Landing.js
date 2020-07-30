import React, { useEffect, useState } from "react"
import { API_URL, API_KEY, IMG_URL } from "../Config"
import axios from "axios"
import SingleMovie from "../Sections/SingleMovie"
import SearchMovie from "../Sections/SearchMovie"

export const Landing = () => {



  const [movies, setMovies] = useState([])

  const [topRated, setTopRated] = useState([])

  const [nowPlaying, setNowPlaying] = useState([])

  const [currentPagePopular, setCurrentPagePopular] = useState(1)

  const [currentPageTopRated, setCurrentPageTopRated] =  useState(1)

  const [currentPageNowPlaying, setCurrentPageNowPlaying] =  useState(1)



  const [Searched, setSearched] = useState(false)
  //the function that change the state of Searched
  function hasSearched() {
    setSearched(true)
  }
  async function getMovies() {
    try {
      const res = await axios.get(
        `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPagePopular}`
      )
      setMovies(res.data.results)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  async function getTopRatedMovies() {
    try {
      const res = await axios.get(
        `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPageTopRated}`
      )
      setTopRated(res.data.results)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  async function getNowPlayingMovies() {
    try {
      const res = await axios.get(
        `${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=${currentPageNowPlaying}`
      )
      setNowPlaying(res.data.results)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
  getTopRatedMovies()
  }, [currentPageTopRated])

  useEffect(() => {
    getNowPlayingMovies()
    }, [currentPageNowPlaying])

  useEffect(() => {
    getMovies()
  },[currentPagePopular])

  function handleNextMovies(){
    setCurrentPagePopular(currentPagePopular + 1)}
  function handlePreviousMovies(){
    setCurrentPagePopular(currentPagePopular - 1)}


  function handleNextTopRated(){
    setCurrentPageTopRated(currentPageTopRated + 1)}
  function handlePreviousTopRated(){
    setCurrentPageTopRated(currentPageTopRated - 1)}

  function handleNextNowPlaying(){
    setCurrentPageNowPlaying(currentPageNowPlaying + 1)}
  function handlePreviousNowPlaying(){
    setCurrentPageNowPlaying(currentPageNowPlaying - 1)}

  return (
    <>
      {/* pass the hasSearched function to the SearchMovie component */}
      <SearchMovie hasSearched={hasSearched} />
      {/* if user searched something, the default movies wont get rendered on the landing page */}
      <div className="inner-grid">
        {!Searched &&
          movies.map((movie) => {
            return (
              <SingleMovie
                key={movie.id}
                image={`${IMG_URL}w400${movie.poster_path}`}
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
