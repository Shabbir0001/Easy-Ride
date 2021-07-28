import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import NotFound from './Components/404/NotFound';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './PrivateRoute';
import Book from './Components/Book/Book';

export const UserContext = createContext();

function App() {
const [loggedInUser, setLoggedInUser] = useState({
        name: '',
        email: '',
        password: '',
        photoURL: '',
        error: '',
        success: false
      });

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/book/:vehicle">
          <Book/>
          </PrivateRoute>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
