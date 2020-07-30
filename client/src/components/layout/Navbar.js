import React from "react"
import { Link } from "react-router-dom"
import AuthOptions from "../auth/AuthOptions"

export const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>
        <Link to="/">
          <i class="fas fa-film"></i> Flicksy
        </Link>
      </h1>
      <AuthOptions />
    </nav>
  )
}
