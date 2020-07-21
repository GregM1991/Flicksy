import React, {useEffect, useState} from 'react'
import axios from "axios"
import { API_URL, API_KEY, IMG_URL} from "../Config"
const ViewMovie = (props) => {
    
    const [getMovie, setGetMovie] = useState('');
    const movieId = props.match.params.movieId
    useEffect(() => {
        try {
          (async () => {
            
            const response = await axios.get(
                `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`
            );
            console.log(response);
            setGetMovie(response.data);
          })();
        } catch (e) {
          console.log(e);
        }
      }, []);
   
    // useEffect(() => {
    //     const movieId = props.match.params.movieId
    //     async function getMovie() {
    //         try {
    //         const res = await axios.get(
    //             `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`
    //         )
    //         console.log(res)
    //         } catch (err) {
    //         console.log(err)
    //         }
            
    //     }
    // })
    return (
        <div> 
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
            <div>${getMovie.budget}</div>
        </div>
    )
}

export default ViewMovie
