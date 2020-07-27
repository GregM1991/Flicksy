import React, {useState, useEffect} from 'react'
import axios from "axios"
import { API_URL, API_KEY } from "../Config"



const SearchMovie = () => {
   
    const [formData, setFormData] = useState("")
    const [moviesData, setMoviesData] = useState("")
    //when submitted it's gonna fetch the formData
    const setOnSubmit = (e) =>{
        e.preventDefault()

        console.log('submited');
        // function that take the formData and put it in the query params
        async function getMovies() {
            const response = await axios.get(
              `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${formData}&page=1`)
            console.log(response);
            setMoviesData(response)
          }
        //when the submit button is clicked, getMovie function get called
        getMovies()
    
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
        </div>
    )
}

export default SearchMovie

