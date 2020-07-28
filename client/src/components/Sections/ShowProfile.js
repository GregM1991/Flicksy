import React, { useContext } from "react"
import UserContext from "../../context/UserContext"
import { Link } from "react-router-dom"
import axios from "axios"

export const ShowProfile = () => {
  const { userProfile } = useContext(UserContext)
  const token = localStorage.getItem("token")
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  }
  const deleteProfile = () => {
    axios.delete(`/api/profile`, config) 
  }

  return (
    <>
      <div>My Profile </div>
      <div>
        {userProfile.playlists.map((playlist) => (
          <Link key={playlist._id} to={`/playlist/${playlist._id.toString()}`}>
            <h3>{playlist.playlistname}</h3>
          </Link>
        ))}
        <button onClick={deleteProfile}> Delete Profile </button>
      </div>
    </>
  )
}
