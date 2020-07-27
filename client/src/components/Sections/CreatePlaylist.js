import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"

export const CreatePlaylist = () => {
  const [formData, setFormData] = useState({
    playlistname: "",
  })
  const history = useHistory()
  const { playlistname } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()

    const newPlaylist = {
      playlistname,
    }

    const token = localStorage.getItem("token")

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
      const body = JSON.stringify(newPlaylist)
      const resPlaylist = await axios.put("/api/profile/playlist", body, config)
      history.push("/profile")
    } catch (error) {
      console.log(error.response)
    }
  }
  return (
    <>
      <h2>Create new playlist</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          placeholder="Playlist Name"
          name="playlistname"
          value={playlistname}
          onChange={(e) => onChange(e)}
        />
        <input type="submit" value="CreatePlaylist" />
      </form>
    </>
  )
}
