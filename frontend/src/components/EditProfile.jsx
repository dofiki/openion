import React, { useState } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import { FiUser, FiLogOut } from 'react-icons/fi';
import './EditProfile.css';

function EditProfile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    bio: 'MMA enthusiast and tech geek.',
    photo: 'https://via.placeholder.com/100',
  });

  const handleChange = (field) => (e) => {
    setUser((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    alert('Changes saved!'); // Replace with your API call
  };

  const handleLogout = () => {
    alert('Logged out!');
    // Add logout logic here
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-card">
        <div className="left-section">
          <Avatar.Root className="avatar-root large">
            <Avatar.Image className="avatar-image" src={user.photo} alt="User Avatar" />
            <Avatar.Fallback className="avatar-fallback">
              <FiUser size={40} />
            </Avatar.Fallback>
          </Avatar.Root>
        </div>

        <div className="right-section">
          <label className="input-label">
            Name
            <input
              type="text"
              value={user.name}
              onChange={handleChange('name')}
              className="input-field"
            />
          </label>

          <label className="input-label">
            Bio
            <textarea
              value={user.bio}
              onChange={handleChange('bio')}
              className="input-field textarea"
              rows={4}
            />
          </label>

          <div className="action-buttons">
            <button className="save-button" onClick={handleSave}>
              Save Changes
            </button>

             <button className="logout-button" onClick={handleLogout}>
                 <FiLogOut size={18} style={{ marginRight: '8px' }} />
              Log Out
            </button>
            
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default EditProfile;
