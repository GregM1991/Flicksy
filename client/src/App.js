import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { Navbar } from "./components/layout/Navbar"
import { Landing } from "./components/layout/Landing"
import ViewMovie from "./components/Sections/ViewMovie"
import UserContext from "./context/UserContext"
import axios from "axios"

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })
  useEffect(() => {
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
  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/showpage" component={ShowPage} /> */}
          <Route exact path="/movie/:movieId" component={ViewMovie} />
          {/* <Route exact path="/profile" component={Profile} /> */}
        </Switch>
      </UserContext.Provider>
    </Router>
  )
}

export default App
