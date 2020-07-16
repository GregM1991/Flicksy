import React from "react"
import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <nav>
      <h1>
        <Link to="/">iFlicks</Link>
      </h1>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  )
}
