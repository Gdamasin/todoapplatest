
import React, { Fragment, useState, useEffect } from "react";
import {toast} from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Redirect
} from "react-router-dom";


import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/dashboard/Dashboard.js";
import Landing from "./components/Landing";

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => { setIsAuthenticated(boolean);
  };
  async function isAuth() {
    try {
      const response = await fetch("/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });


      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);


  return ( <Fragment>
  <Router>
    <div className="container">
      <Switch>
      <Route
              exact
              path="/"
              render={props =>
                !isAuthenticated ? (
                  <Landing {...props}/>
                ) : (
                  <Redirect to="/Dashboard" />
                )
              }
            />
      <Route
              exact
              path="/Login"
              render={props =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/Dashboard" />
                )
              }
            />
            <Route
              exact
              path="/Register"
              render={props =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/Dashboard" />
                )
              }
            />
            <Route
              exact
              path="/Dashboard"
              render={props =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/Login" />
                )
              }
            />
      </Switch>
    </div>
  </Router>
  </Fragment>
  );
  };

export default App;
