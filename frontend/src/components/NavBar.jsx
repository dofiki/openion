import React, { useEffect, useState } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import { FiSettings, FiUser } from 'react-icons/fi';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    // Read initial state from localStorage
    const stored = localStorage.getItem('darkMode');
    return stored ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    // Apply mode to document
    if (darkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }

    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          opponion
        </div>
        <input type="text" className="searchbar" placeholder="Search..." />
      </div>

      <div className="navbar-right">
        <button className="icon-button" title="Settings" onClick={() => navigate('/settings')}>
          <FiSettings size={20} />
        </button>

        <button
          className="icon-button"
          title="Toggle dark mode"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <BsSun size={22} color="#ffd700" /> : <BsMoon size={18} color="#f39c12" />}
        </button>

        <button
          className="icon-button"
          title="Profile"
          onClick={() => navigate('/profile')}
          style={{ padding: 0, borderRadius: '50%' }}
        >
          <Avatar.Root className="avatar-root">
            <Avatar.Image
              className="avatar-image"
              src="https://via.placeholder.com/40"
              alt="User Avatar"
            />
            <Avatar.Fallback className="avatar-fallback">
              <FiUser size={20} />
            </Avatar.Fallback>
          </Avatar.Root>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
