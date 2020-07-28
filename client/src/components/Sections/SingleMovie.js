import React from "react"

import { Link } from "react-router-dom"
const SingleMovie = (props) => {
  return (
    <>
      <Link to={`/movie/${props.movieId}`}>
        <div
          style={{
            backgroundImage: `url(${props.image})`,
            width: "auto",
            height: "300px",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <span>{props.title}</span>
        <p>{props.text}</p>
      </Link>
    </>
  )
}

export default SingleMovie
