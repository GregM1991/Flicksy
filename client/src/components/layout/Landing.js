import React, {useEffect, useState} from "react"
import {API_URL, API_KEY,IMG_URL} from '../Config'
import axios from "axios"

import MainImg from "../Sections/MainImg"



export const Landing = () => {
  const [Movies, setMovies] = useState([])

  useEffect(() => {
    async function getMovie(){
      try{
        const res = await axios.get(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
        console.log(res);
        setMovies(res.results)

      } catch(err){
        console.log(err);
      }
    }
    getMovie ()
  }, [])
  return (
  
  <div >
  
    <MainImg image={`${IMG_URL}/w1280${Movies[0].backdrop_path}`} 
             title={Movies[0].original_title} 
              text={Movies[0].overview}/>
    
      {/* Body */}
      <div>
        <span>Latest Movie</span>
        <hr/>

      
        

        {/* Load more button */}
        <div>
          <button> 
            LOAD MORE
          </button>
        </div>
        
      </div>
    </div>
  
  )
}
