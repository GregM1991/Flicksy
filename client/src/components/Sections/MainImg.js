import React from "react"

const MainImg = (props) => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${props.image})`,
          width: "100%",
          height: "400px",
        }}
      ></div>
      <span>{props.title}</span>
      <p>{props.text}</p>
    </>
  )
}

export default MainImg
