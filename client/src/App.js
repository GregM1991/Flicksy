import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { Navbar } from "./components/layout/Navbar"
import { Landing } from "./components/layout/Landing"
import ViewMovie from "./components/Sections/ViewMovie"

const App = () => {
  useEffect(() => {
    console.log(localStorage)
  })
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/showpage" component={ShowPage} /> */}
        <Route exact path="/movie/:movieId" component={ViewMovie}/>
    
      </Switch>
    </Router>
  )
}

export default App
