import React, { useContext } from "react"
import UserContext from "../../context/UserContext"

export default function ViewPlaylist(props) {
  const { userProfile } = useContext(UserContext)

  const currentPlaylist = userProfile.playlists.find(
    (playlist) => playlist._id.toString() === props.match.params.playlistId
  )

  return (
    <>
      <h1>{currentPlaylist && currentPlaylist.playlistname}</h1>
      <ul>
        {currentPlaylist && currentPlaylist.playlist ? (
          currentPlaylist.playlist.map((movie) => (
            <li key={movie._id}>{movie.movieurl}</li>
          ))
        ) : (
          <li>There are no movies in this playlist.</li>
        )}
      </ul>
    </>
  )
}
