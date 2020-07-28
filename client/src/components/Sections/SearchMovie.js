import React, {useState, useEffect} from 'react'
import axios from "axios"
import { API_URL, API_KEY, IMG_URL } from "../Config"
import SingleMovie from './SingleMovie'



const SearchMovie = (props) => {
    const {hasSearched} = props
    const [formData, setFormData] = useState("")
    const [moviesData, setMoviesData] = useState([])
    //when submitted it's gonna fetch the formData
    const setOnSubmit = (e) =>{
        e.preventDefault()
        

        console.log('submited');
        // function that take the formData and put it in the query params
        async function getMovies() {
            const response = await axios.get(
              `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${formData}&page=1`)
            console.log(response.data);
            setMoviesData(response.data.results)
          }
        //when the submit button is clicked, getMovie function get called
        getMovies()
        //when the data is submitted, the hasSearched function get call and change the state of Searched 
        .then(()=>{
            hasSearched()
        })
    
    }
    

    
    return (
        <div>
            <form onSubmit={setOnSubmit}>
                <input 
                    type="text" 
                    placeholder="search movie by title" 
                    value={formData}
                    onChange={(e)=> setFormData(e.target.value)}>

                    </input>
                <input type="submit" value="search"></input>
            </form>
            <div>
                {moviesData.map(movie =>{
                    return(
                        <SingleMovie
                            key={movie.id}
                            image={`${IMG_URL}w400${movie.backdrop_path}`}
                            title={movie.original_title}
                            text={movie.overview}
                            movieId={movie.id}/>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchMovie

