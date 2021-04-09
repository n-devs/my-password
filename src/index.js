import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import './index.css';
// import App from './App';
// import rootReducer from './reducers/rootReducer';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import firebase from './services/firebase';
import renderLoader from './components/renderLoader';
// import { useSelector, useDispatch } from 'react-redux';
// const store = createStore(rootReducer)

const App = React.lazy(() => import('./App'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    ReactDOM.render(
      <React.Suspense fallback={renderLoader()}>
        {/* <Provider store={store}> */}
          <App user={user} />
          {/* </Provider> */}
      </React.Suspense>, document.getElementById('root'));
  } else {
    ReactDOM.render(
      <React.Suspense fallback={renderLoader()}>
        {/* <Provider store={store}> */}
          <App user={null} />
          {/* </Provider> */}
      </React.Suspense>, document.getElementById('root'));
  }
})
// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
