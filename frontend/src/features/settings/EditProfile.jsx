import React, { useState } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import { FiUser, FiLogOut } from 'react-icons/fi';
import './EditProfile.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchUserProfile, fetchCurrentUser } from '../profile/profileApi.js';
import { pushUpdate, logOut } from './settingsApi.js';
import Toaster from '../../components/Toaster.jsx';

function EditProfile() {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [openToast, setOpenToast] = useState(false);
  const navigate = useNavigate();

  const showToast = (msg) => {
    setToastMessage(msg);
    setOpenToast(true);
  };

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const curUser = await fetchCurrentUser();
      setCurrentUser(curUser);
      const profileData = await fetchUserProfile(curUser._id);
      setUser(profileData);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };
  fetchProfile();
}, []);

  const handleChange = (field) => (e) => {
    setUser((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
   try{
    pushUpdate(user, currentUser._id);
    showToast("Profile updated sucessfully")
   }catch(error){
    console.log(error)
   }
  };

   const handleLogout = async () => {
    try {
      await logOut();
      showToast("Logged out sucessfully")
      navigate('/onboarding'); 
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed.');
    }
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-card">
        <div className="left-section">
          <Avatar.Root className="avatar-root large">
            <Avatar.Image className="avatar-image" src={<FiUser size={40} />} alt="User Avatar" />
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
              value={user?.username}
              onChange={handleChange('username')}
              className="input-field"
            />
          </label>

          <label className="input-label">
            Bio
            <textarea
              value={user?.bio}
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
            <Toaster message={toastMessage} open={openToast} setOpen={setOpenToast} />
            
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default EditProfile;
