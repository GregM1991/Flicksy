import React, { useState, useEffect } from "react"
import axios from "axios"
const Playlists = () => {
  const [playlists, setPlaylists] = useState([])
  useEffect(() => {
    const getPlayLists = async () => {
      const token = localStorage.getItem("token")
      const response = await axios.get("api/profile/me", {
        headers: { "x-auth-token": token },
      })
      setPlaylists(response.data.playlists)
      console.log(response.data.playlists[0].playlistname)
    }
    getPlayLists()
  }, [])

  return (
    <div>
      <div>
        {playlists.map((playlist) => (
          <div>
            <h3 key={playlist.playlistname}>{playlist.playlistname}</h3>
            <p>{`Movies: ${playlist.playlist.length}`}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Playlists
