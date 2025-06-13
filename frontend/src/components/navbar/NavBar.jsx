// src/components/layout/NavBar.jsx

import React, { useEffect, useState } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import { FiSettings, FiUser } from 'react-icons/fi';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import useAuthStore from '../../store/store.js';
import { searchUserByUsername } from './navbarApi.js';


function NavBar() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const userId = user?._id;

  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? JSON.parse(stored) : true;
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleSearchKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!searchTerm.trim()) return;

      const results = await searchUserByUsername(searchTerm.trim());
      if (results.length > 0) {
        navigate(`/profile/${results[0]._id}`);
        setSearchTerm('');
      } else {
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          openion
        </div>
        <input
          type="text"
          className="searchbar"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
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
          onClick={() => navigate(`/profile/${userId}`)}
          style={{ padding: 0, borderRadius: '50%' }}
        >
          <Avatar.Root className="avatar-root">
            <Avatar.Image className="avatar-image" src="" alt="User Avatar" />
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
