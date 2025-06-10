import { useState } from 'react';
import * as Label from '@radix-ui/react-label';
import { login, register } from './authApi.js';
import useAuthStore from '../../store/store.js';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import {
  isValidUsername,
  isValidEmail,
  isValidPassword,
} from '../../utils/validate.js';
import Toaster from '../../ui/Toaster.jsx';

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState('');
  const [openToast, setOpenToast] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setOpenToast(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isRegistering) {
        // Registration validation
        if (!username || !email || !password) {
          showToast('Please fill in all fields');
          return;
        }

        if (!isValidUsername(username)) {
          showToast('Username must contain only letters (A-Z, a-z)');
          return;
        }

        if (!isValidEmail(email)) {
          showToast('Please enter a valid email address');
          return;
        }

        if (!isValidPassword(password)) {
          showToast('Password must be at least 6 characters long');
          return;
        }

        console.log('Starting registration process...');
        const response = await register({ username, email, password });
        console.log('Registration successful:', response);
        
     
        showToast('Registration successful!');
        setIsRegistering(false);
        // Clear form
        setUsername('');
        setEmail('');
        setPassword('');
        
      } else {
        // Login validation
        if (!username || !password) {
          showToast('Please enter username and password');
          return;
        }

        if (!isValidUsername(username)) {
          showToast('Username must contain only letters (A-Z, a-z)');
          return;
        }

        if (!isValidPassword(password)) {
          showToast('Password must be at least 6 characters long');
          return;
        }

        console.log('Starting login process...');
        const response = await login({ username, password });
        console.log('Login successful:', response);
        
        setUser(response.user);
        navigate('/');
      }
    } catch (error) {
      console.error('Auth error:', error);
      
      // More specific error messages
      if (error.message.includes('fetch')) {
        showToast('Cannot connect to server. Please check if the server is running.');
      } else if (error.message.includes('400')) {
        showToast('Invalid input. Please check your information.');
      } else if (error.message.includes('409')) {
        showToast('Username or email already exists.');
      } else if (error.message.includes('500')) {
        showToast('Server error. Please try again later.');
      } else {
        showToast(error.message || (isRegistering ? 'Registration failed. Please try again.' : 'Login failed. Please try again.'));
      }
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
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
              disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="btn primary" disabled={isLoading}>
          {isLoading ? 'Please wait...' : (isRegistering ? 'Register' : 'Login')}
        </button>
      </form>

      <div className="toggle">
        {isRegistering ? (
          <button 
            className="link" 
            onClick={() => setIsRegistering(false)}
            disabled={isLoading}
          >
            ← Back to Login
          </button>
        ) : (
          <p>
            New here?{' '}
            <button 
              className="link" 
              onClick={() => setIsRegistering(true)}
              disabled={isLoading}
            >
              Create an account
            </button>
          </p>
        )}
      </div>

      <Toaster message={toastMessage} open={openToast} setOpen={setOpenToast} />
    </div>
  );
}