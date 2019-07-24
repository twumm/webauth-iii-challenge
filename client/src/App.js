import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';

import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ListUsers from './components/ListUsers';

function App() {
  return (
    <Router>
      <div className="App">
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            margin: '20px'
          }}
        >
          <NavLink
            to="/"
            exact
          >
            Users
          </NavLink>

          <NavLink
            to="/sign-in"
          >
            SignIn
          </NavLink>

          <NavLink
            to="/sign-up"
          >
            SignUp
          </NavLink>
        </nav>

        <Route
          path="/"
          exact
          render={props => (
            <ListUsers
              {...props}
            />
          )}
        />

        <Route
          path="/sign-in"
          exact
          component={SignIn}
        />

        <Route
          path="/sign-up"
          exact
          component={SignUp}
        />

      </div>
    </Router>
  );
}

export default App;
