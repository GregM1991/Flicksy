import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import GetMovie from "./GetMovie"

function App() {
  return (
    <>
    <Router>
    <GetMovie />
      <div>Hello World</div>
      <Login />
      <Register />
    </Router>
    </>
  )
}

export default App
