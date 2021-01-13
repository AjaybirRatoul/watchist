import React from "react"
import Signup from "./Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Discover from "./Discover"
import WatchList from "./WatchList"
import Watched from "./Watched"

function App() {
  return (
    // Website navigation
    <Router>
      <Switch>
        <AuthProvider>
          <PrivateRoute
            path={`${process.env.PUBLIC_URL}/update-profile`}
            component={UpdateProfile}
          />
          <Route path={`${process.env.PUBLIC_URL}/signup`} component={Signup} />
          <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
          <Route
            path={`${process.env.PUBLIC_URL}/forgot-password`}
            component={ForgotPassword}
          />
          <PrivateRoute
            exact
            path={`${process.env.PUBLIC_URL}/`}
            component={Discover}
          />
          <PrivateRoute
            path={`${process.env.PUBLIC_URL}/watch-list`}
            component={WatchList}
          />
          <PrivateRoute
            path={`${process.env.PUBLIC_URL}/watched`}
            component={Watched}
          />
        </AuthProvider>
      </Switch>
    </Router>
  )
}

export default App
