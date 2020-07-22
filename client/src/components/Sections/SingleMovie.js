import React from "react"

import { Link } from "react-router-dom"
const SingleMovie = (props) => {
  return (
    <>
      <Link to={`/movie/${props.movieId}`}>
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

export default SingleMovie
