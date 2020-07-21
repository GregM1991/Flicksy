import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

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
      console.log(res.data.token)
      localStorage.setItem("token", res.data.token)
      console.log("Logged In")
      history.push("/")
    } catch (error) {
      console.error(error.response.data)
    }
  }

  return (
    <>
      <h1>Login</h1>
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
    </>
  )
}
