import React from "react"
import { API_URL, API_KEY, IMG_URL } from "../Config"
import {Link} from 'react-router-dom'
const MainImg = (props) => {
  return (
    <>
    <Link to={`/movie/${props.movieId}`} >
      <div
        style={{
          backgroundImage: `url(${props.image})`,
          width: "100%",
          height: "100px",
          backgroundRepeat: "no-repeat",
        }}
        
      ></div>
      </Link>
      <span>{props.title}</span>
      <p>{props.text}</p>
    </>
  )
}

export default MainImg
