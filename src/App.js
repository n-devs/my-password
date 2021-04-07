import React, { useContext, createContext, useState } from "react";
import firebase from 'firebase';
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import NewPassword from './components/NewPassword';
import SignInView from './views/Singin';
import HomeView from './views/Home';

function App(props) {

  // const [user, setAuth] = React.useState()
  const { user } = props

  console.log(user);
  return (
    <Router>
      <Switch>
        <PublicRoute  path="/login" user={user} >
          <SignInView></SignInView>
        </PublicRoute>
        <PrivateRoute exact path="/" user={user}>
          <HomeView user={user}></HomeView>
        </PrivateRoute>
        <PrivateRoute  path="/new-password" user={user}>
          <NewPassword></NewPassword>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
