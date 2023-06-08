import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './actions/auth';
import './App.css';


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const ShowSignupForm = () => {
    setIsLoginForm(false);
  }

  const handleLogin = (e) => {
    e.preventDefault();

    // Send a POST request to the backend server
    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isValid) {
          console.log('Login successful');
          dispatch(loginSuccess(data.user)); // Dispatch the login success action with the user data
        } else {
          console.log('Invalid email or password');
          // Display an error message to the user
        }
      })
      .catch((error) => {
        console.error('Error verifying credentials:', error);
      });
  };

  const handleSignUp = (e) => {
    e.preventDefault();


    // Send a POST request to the backend server for signup
    fetch('http://localhost:8000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Signup response:', data); // Add this line
        console.log('Signup successful');
        // Do something after successful signup
      })
      .catch((error) => {
        console.error('Error signing up:', error);
      });
  };

  const handleReturnToLogin = () => {
    setIsLoginForm(true);
  };

  return (
    <div className="App">
      <div className="top-of-page">
        <div className="logo-homepage"></div>
      </div>

      <div className="button-container">
        {isLoginForm ? (
          <button disabled>Sign in</button>
        ) : (
          <button onClick={handleReturnToLogin}>Sign in</button>
        )}
        {isLoginForm ? (
          <button onClick={ShowSignupForm}>Sign up</button>
        ) : (
          <button disabled>Sign up</button>
        )}
      </div>

      <form onSubmit={isLoginForm ? handleLogin : handleSignUp}>
        {isLoginForm ? (
          <div>
            <div>
              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div>
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
          </div>
        ) : (
          <div>
            <div>
              <input
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
                required
              />
            </div>
            <div>
              <input
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
                required
              />
            </div>
            <div>
              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div>
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                minLength={8} // Minimum password length requirement
              />
            </div>
          </div>
        )}

        <button type="submit">{isLoginForm ? 'Login' : 'Sign up'}</button>
      </form>
    </div>
  );
}

export default App;
