import React, {useEffect, useState} from 'react'
import axios from "axios"
import { API_URL, API_KEY} from "../Config"
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
                backgroundImage: `url(${props.image})`,
                width: "100%",
                height: "100px",
                backgroundRepeat: "no-repeat",
                }}
            >
                
            </div>
            <span>{props.title}</span>
            <p>{props.text}</p>
        </div>
    )
}

export default ViewMovie
