import React from "react";
// import firebase from 'firebase';
// import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
// import PublicRoute from './components/PublicRoute';
// import PrivateRoute from './components/PrivateRoute';
// import NewPassword from './components/NewPassword';
// import SignInView from './views/Singin';
// import HomeView from './views/Home';

const PublicRoute = React.lazy(() => import('./components/PublicRoute'));
const PrivateRoute = React.lazy(() => import('./components/PrivateRoute'));
const AddDataView = React.lazy(() => import('./views/AddData'));
const UpdateDataView = React.lazy(() => import('./views/UpdateData'));
const HistoryView = React.lazy(() => import('./views/History'));
const SignInView = React.lazy(() => import('./views/Singin'));
const HomeView = React.lazy(() => import('./views/Home'));

function App(props) {

  // const [user, setAuth] = React.useState()
  const { user } = props

  console.log(user);
  return (
    <Router>
      <Switch>
        <PublicRoute path="/login" user={user} >
          <SignInView></SignInView>
        </PublicRoute>
        <PrivateRoute exact path="/" user={user}>
          <HomeView user={user}></HomeView>
        </PrivateRoute>
        <PrivateRoute path="/add-data" user={user}>
          <AddDataView user={user}></AddDataView>
        </PrivateRoute>
        <PrivateRoute path="/update-data" user={user}>
          <UpdateDataView user={user}></UpdateDataView>
        </PrivateRoute>
        <PrivateRoute path="/history" user={user}>
          <HistoryView user={user}></HistoryView>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
