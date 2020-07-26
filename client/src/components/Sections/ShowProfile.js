import React, { useContext } from "react"
import SinglePlaylist from "./SinglePlaylist"
import UserContext from "../../context/UserContext"
import { useHistory } from "react-router-dom"
// import Playlists from "./Playlists"

export const ShowProfile = () => {
  const history = useHistory()
  const { userProfile } = useContext(UserContext)
  const createPlaylist = () => {
    history.push("/profile/create-playlist")
  }
  return (
    <>
      <div>My Profile</div>
      <div>
        {userProfile.playlists.map((playlist) => (
          <SinglePlaylist key={playlist._id.toString()} />
        ))}
      </div>
      <button onClick={createPlaylist}>Create Playlist</button>
    </>
  )
}
