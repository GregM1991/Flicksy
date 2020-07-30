import React, { useState, useContext } from "react"
import UserContext from "../../context/UserContext"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"
import ErrorNotice from "../misc/ErrorNotice"

// State setup
export const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  })
  const [error, setError] = useState([])
  // Grab context
  const { setUserData } = useContext(UserContext)
  const history = useHistory()

  // Destructure form data
  const { email, password, password2 } = formData

  // Passing form data in dynamically
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  // Submitting form data to backend
  const onSubmit = async (e) => {
    e.preventDefault()
    if (password !== password2) {
      setError("Passwords do not match")
    } else {
      const newUser = {
        // Create new user from formData
        email,
        password,
      }
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          }, // Set headers for response
        }
        const body = JSON.stringify(newUser) // Set body for response
        const resData = await axios.post("/api/users", body, config) // Send request to register user
        localStorage.setItem("token", resData.data.token)
        const token = localStorage.getItem("token")
        const userRes = await axios.get("/api/auth", {
          headers: { "x-auth-token": token },
        }) // Sends request to get user back from login route
        setUserData({
          // Setting state
          token,
          user: userRes.data,
        })
        console.log("Success")
        history.push("/") // Returning to Landing page
      } catch (error) {
        console.log(error.response)
        error.response.data.errors && setError(error.response.data.errors)
        console.error(error.response.data.msg)
      }
    }
  }
  return (
    <div className="flex-container">
      <div className="form-container">
        <h1 className="form-header">Sign Up</h1>
        {error.map((e) => {
          return (
            <ErrorNotice
              key={e.msg}
              message={e.msg}
              clearError={() => setError([])}
            />
          )
        })}
        <p>Create Your Account</p>
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={(e) => onChange(e)}
          />
          <input type="submit" value="Register" />
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login">
            <span className="underline">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  )
}
