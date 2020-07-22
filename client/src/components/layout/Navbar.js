import React from "react"
import { Link } from "react-router-dom"
import AuthOptions from "../auth/AuthOptions"

export const Navbar = () => {
  return (
    <nav>
      <h1>
        <Link to="/">iFlicks</Link>
      </h1>
      <AuthOptions />
    </nav>
  )
}
