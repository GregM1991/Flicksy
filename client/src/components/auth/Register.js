import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const history = useHistory()

  const { name, email, password, password2 } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (password !== password2) {
      console.log("Passwords do not match")
    } else {
      const newUser = {
        name,
        email,
        password,
      }
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        }
        const body = JSON.stringify(newUser)
        const res = await axios.post("/api/users", body, config)
        console.log(res.data)
        localStorage.setItem("token", res.data.token)
        console.log("Success")
        history.push("/")
      } catch (error) {
        console.error(error.response.data)
      }
    }
  }
  return (
    <>
      <h1>Sign Up</h1>
      <p>Create Your Account</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
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
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  )
}
