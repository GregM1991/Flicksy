import React, { useState, useContext } from "react"
import UserContext from "../../context/UserContext"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"
import ErrorNotice from "../misc/ErrorNotice"

const Profile = () => {
    const [formData, setFormData] = useState({
        name: "",
    })
    const [error, setError] = useState()

    const { setProfileData } = useContext(UserContext)
    const history = useHistory()

    const { name } = formData

    const onChange = (e) =>
    setFormData({ ...formData, [e.tarrget.name]: e.target.value })

    const onSubmit = async (e) => {
        e.preventDefault()
        const newProfile = {
        name,
    }
    try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        }
        const body = JSON.stringify(newProfile)
        await axios.post("/api/profile", body, config)
        const token = localStorage.getItem("token")
        const userRes = await axios.get("/api/auth", {
            headers: { "x-auth-token": token },
        }) 
        setProfileData({
            token,
            user: userRes.data,
        })
        console.log("Success")
        history.push("/Profile")
    } catch (error) {
        console.response.data.errors &&
        setError(error.response.data.errors[0].msg)
        console.error(error.response.data.msg)
    } return (
      <h1>Hello World</h1>
        // <>
        //   <h2>Your Profile</h2>
        //   {error && (
        //     <ErrorNotice message={error} clearError={() => setError(undefined)} />
        //   )}
        //   <p>Create Your Account</p>
        //   <form onSubmit={(e) => onSubmit(e)}>
        //     <input
        //       type="text"
        //       placeholder="Name"
        //       name="name"
        //       value={name}
        //       onChange={(e) => onChange(e)}
        //     />
        //     <input type="submit" value="Profile" />
        //   </form>
        // </>
    )
}}

export default Profile