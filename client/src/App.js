import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { Navbar } from "./components/layout/Navbar"
import { Landing } from "./components/layout/Landing"
import ViewMovie from "./components/Sections/ViewMovie"
import UserContext from "./context/UserContext"
import axios from "axios"
import Profile from "./components/Sections/Profile"
import ViewPlaylist from "./components/Sections/ViewPlaylist"
import SearchMovie from "./components/Sections/SearchMovie"

const App = () => {
  const [userProfile, setUserProfile] = useState(null)
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })
  useEffect(() => {
    console.log("in first useEffect")
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token")
      const userRes = await axios.get("/api/auth", {
        headers: { "x-auth-token": token },
      })
      setUserData({
        token,
        user: userRes.data,
      })
    }

    checkLoggedIn()
  }, [])

  useEffect(() => {
    const getUserProfile = async () => {
      const token = localStorage.getItem("token")
      console.log(token)
      const profRes = await axios.get("/api/profile/me", {
        headers: { "x-auth-token": token },
      })
      setUserProfile({
        user: profRes.data.user,
        name: profRes.data.name,
        playlists: profRes.data.playlists,
        reviews: profRes.data.reviews,
      })
    }

    getUserProfile()
  }, [])

  return (
    <Router>
      <UserContext.Provider
        value={{ userData, setUserData, userProfile, setUserProfile }}
      >
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          {userProfile && (
            <>
              <Route exact path="/movie/:movieId" component={ViewMovie} />
              <Route
                exact
                path="/playlist/:playlistId"
                component={ViewPlaylist}
              />
            </>
          )}
        </Switch>
      </UserContext.Provider>
    </Router>
  )
}

export default App
