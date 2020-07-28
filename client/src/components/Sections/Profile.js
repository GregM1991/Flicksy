import React, { useContext } from "react"
import UserContext from "../../context/UserContext"
import CreateProfile from "./CreateProfile"
import { ShowProfile } from "./ShowProfile"

export default function Profile() {
  const { userProfile } = useContext(UserContext)
  console.log(userProfile)

  return (
    <>
      {/* Refactor this to be hasProfile */}
      <div>{userProfile === null ? <CreateProfile /> : <ShowProfile />}</div>
    </>
  )
}
