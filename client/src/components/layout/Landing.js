import React, { useEffect, useState } from "react"
import { API_URL, API_KEY, IMG_URL } from "../Config"
import axios from "axios"
import SingleMovie from "../Sections/SingleMovie"
import SearchMovie from "../Sections/SearchMovie"

export const Landing = () => {



  const [movies, setMovies] = useState([])

  const [topRated, setTopRated] = useState([])

  const [currentPage, setCurrentPage] = useState(1)



  const [Searched, setSearched] = useState(false)
  //the function that change the state of Searched
  function hasSearched(){
    setSearched(true)
  }
  async function getMovies() {
    try {
      const res = await axios.get(
        `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`
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
        `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      )
      setTopRated(res.data.results)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    
  getTopRatedMovies()

  }, [])
  useEffect(() => {
    console.log(currentPage)
    getMovies()

  },[currentPage])

  function handleNext(){
    setCurrentPage(currentPage + 1)
    console.log('clicked')
  }
  function handlePrevious(){
    setCurrentPage(currentPage - 1)
    console.log('clicked')
  }

  return (
    <>
    {/* pass the hasSearched function to the SearchMovie component */}
    <SearchMovie hasSearched={hasSearched}/>  
    <h1>Popular Movies</h1>
    <button onClick={handleNext}>Next</button>
    {
      currentPage >1 && <button onClick={handlePrevious}>Previous</button>
    }
    
    {/* if user searched something, the default movies wont get rendered on the landing page */}
      {!Searched && movies.map((movie) => {
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

    

    <h1>Top Rated Movies</h1>
    {!Searched && topRated.map((movie) => {
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
      
     
    </>
  )
}
