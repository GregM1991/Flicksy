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
      <div>My Profile </div>
      <div>
        {userProfile.playlists.map((playlist) => (
          <SinglePlaylist key={playlist._id.toString()} />
        ))}
      </div>
      <button onClick={createPlaylist}>Create Playlist</button>
      <div>Reviews
        <div>{userProfile.reviews.map(review => (
        
          <div key={review.reviewtitle}>{review.reviewtitle}
            <div key={review.reviewdescription}>{review.reviewdescription}</div>
          </div>
        ))}</div>
      </div>
    </>
  )
}
