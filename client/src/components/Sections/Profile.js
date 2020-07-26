import React, { useState, useContext } from "react"
import UserContext from "../../context/UserContext"
import CreateProfile from "./CreateProfile"
import { ShowProfile } from "./ShowProfile"

export default function Profile() {
  const { userProfile } = useContext(UserContext)

  return (
    <>
      {/* Refactor this to be hasProfile */}
      <div>{!userProfile.name ? <CreateProfile /> : <ShowProfile />}</div>
    </>
  )
}
