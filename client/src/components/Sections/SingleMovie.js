import React from "react"

import { Link } from "react-router-dom"
const SingleMovie = (props) => {
  return (
    <>
      <Link to={`/movie/${props.movieId}`}>
        <div
          className="single-movie"
          style={{
            backgroundImage: `url(${props.image})`,
          }}
        >
          <div className="single-movie-info">
            <h3>{props.title}</h3>
            <p>{props.text}</p>
            <span>View movie</span>
          </div>
        </div>
      </Link>
    </>
  )
}

export default SingleMovie
