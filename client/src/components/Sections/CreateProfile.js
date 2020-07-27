import React, { useState} from "react"
import axios from "axios"
import ErrorNotice from "../misc/ErrorNotice"


export default function CreateProfile() {
  const [formData, setFormData] = useState({
    name: "",
  })
  const [error, setError] = useState()

  const { name } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()

    const newProfile = {
      name,
    }
    try {
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
      const body = JSON.stringify(newProfile)
      const profileRes = await axios.post("/api/profile", body, config)
      console.log(profileRes.data)
      console.log("Success")
      // history.push("/Profile")
    } catch (error) {
      console.log(error.response)
      error.response.data.errors && setError(error.response.data.errors)
      console.error(error.response.data.msg)
    }
  }

  return (
    <>
      <h2>Your Profile</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <p>Create Your Profile</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <input type="submit" value="Profile" />
      </form>
    </>
  )
}
