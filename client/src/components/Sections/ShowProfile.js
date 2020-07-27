import React, { useContext } from "react"
import UserContext from "../../context/UserContext"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"

export const ShowProfile = () => {
  const history = useHistory()
  const { userProfile } = useContext(UserContext)

  const deleteProfile = () => {}

  return (
    <>
      <div>My Profile </div>
      <div>
        {userProfile.playlists.map((playlist) => (
          <Link key={playlist._id} to={`/playlist/${playlist._id.toString()}`}>
            <h3>{playlist.playlistname}</h3>
          </Link>
        ))}
        <button onClick={deleteProfile}>Delete Profile</button>
      </div>
    </>
  )
}
