import React, { useState } from 'react';
import * as Label from '@radix-ui/react-label';
import { login, register } from './api.jsx';
import useAuthStore from './store.jsx';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistering) {
      if (!username || !email || !password) {
        alert('Please fill in all fields');
        return;
      }

      register({ username, email, password })
        .then((response) => {
          console.log('Registration successful:', response);
          setIsRegistering(false); // Switch to login
        })
        .catch((error) => {
          console.error('Registration error:', error);
          alert('Registration failed. Please try again.');
        });
    } else {
      if (!username || !password) {
        alert('Please enter username and password');
        return;
      }

      login({ username, password })
        .then((response) => {
          setUser(response.user); // assuming API returns { user }
          navigate('/'); // redirect after login
        })
        .catch((error) => {
          console.error('Login error:', error);
          alert('Login failed. Please try again.');
        });
    }
  };

  return (
    <div className="auth-box">
      <h2>{isRegistering ? 'Create Account' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Label.Root htmlFor="username">Username</Label.Root>
          <input
            id="username"
            type="text"
            placeholder="your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {isRegistering && (
          <div className="form-group">
            <Label.Root htmlFor="email">Email</Label.Root>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}

        <div className="form-group">
          <Label.Root htmlFor="password">Password</Label.Root>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn primary">
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>

      <div className="toggle">
        {isRegistering ? (
          <button className="link" onClick={() => setIsRegistering(false)}>
            ← Back to Login
          </button>
        ) : (
          <p>
            New here?{' '}
            <button className="link" onClick={() => setIsRegistering(true)}>
              Create an account
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
