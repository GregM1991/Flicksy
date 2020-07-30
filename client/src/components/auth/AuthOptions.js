import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import UserContext from "../../context/UserContext"

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext)

  const history = useHistory()

  const register = () => history.push("/register")
  const login = () => history.push("/login")
  const profile = () => history.push("/profile")
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    })
    localStorage.setItem("token", "")
  }
  return (
    <div>
      {userData.user ? (
        <>
          <button className="button" onClick={profile}>
            My Profile
          </button>
          <button className="button" onClick={logout}>
            Log Out
          </button>
        </>
      ) : (
        <>
          <button className="button" onClick={register}>
            Register
          </button>
          <button className="button" onClick={login}>
            Log in
          </button>
        </>
      )}
    </div>
  )
}
