import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';

import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ListUsers from './components/ListUsers';

const authUrl = 'http://localhost:5000'

function App() {
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [requestError, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async (userObject) => {
    setLoading(true);
    try {
      const newUser = await axios.post(`${authUrl}/api/register`, userObject);
      setUser(newUser.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (userObject) => {
    setLoading(true);
    try {
      const user = await axios.post(`${authUrl}/api/login`, userObject);
      await localStorage.setItem('token', user.data.token);
      setUser(user.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      const users = await axios.get(`${authUrl}/api/users`);
      setUsers(users);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

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
          render={props => (
            <ListUsers
              {...props}
              users={users}
              error={requestError}
              loading={loading}
            />
          )}
        />

        <Route
          path="/sign-in"
          render={props => (
            <SignIn
              {...props}
              signIn={signIn}
            />
          )}
        />

        <Route
          path="/sign-up"
          render={props => (
            <SignUp
              {...props}
              signUp={signUp}
            />
          )}
        />

      </div>
    </Router>
  );
}

export default App;
