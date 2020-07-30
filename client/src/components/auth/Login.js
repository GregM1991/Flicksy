import React, { useState, useContext } from "react"
import UserContext from "../../context/UserContext"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { setUserData } = useContext(UserContext)

  const history = useHistory()

  const { email, password } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()

    const existingUser = {
      email,
      password,
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      const body = JSON.stringify(existingUser)
      const res = await axios.post("/api/auth", body, config)
      const token = res.data.token
      console.log(res.data)
      localStorage.setItem("token", token)
      const userRes = await axios.get("/api/auth", {
        headers: { "x-auth-token": token },
      }) // Sends request to get user back from login route
      setUserData({
        // Setting state
        token,
        user: userRes.data,
      })
      console.log("Logged In")
      history.push("/")
    } catch (error) {
      console.error(error.response.data)
    }
  }

  return (
    <div class="flex-container">
      <div className="form-container">
        <h1 className="form-header">Login</h1>
        <p>Sign in to your account</p>
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
          <input type="submit" value="Login" />
        </form>
        <p>
          Already have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}
