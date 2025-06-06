import React, { useState } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import * as Dialog from '@radix-ui/react-dialog';
import { FiEdit2, FiSettings, FiUser, FiX} from 'react-icons/fi';
import { CgFeed } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import './SideBar.css';

function Sidebar({ userName = 'dofiki' }) {
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState('');

  return (
    <aside className="sidebar">
      <div
        className="profile-section"
        onClick={() => navigate('/profile')}
        style={{ cursor: 'pointer' }}
        title="Go to Profile"
      >
        <Avatar.Root className="avatar-root">
          <Avatar.Image
            className="avatar-image"
            src="https://via.placeholder.com/60"
            alt="User Avatar"
          />
          <Avatar.Fallback className="avatar-fallback">
            <FiUser size={22} />
          </Avatar.Fallback>
        </Avatar.Root>
        <div className="username">{userName}</div>
      </div>

      <nav className="sidebar-nav">
        {/* Create Post Modal Trigger and Content */}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="sidebar-button">
              <FiEdit2 size={20} />
              <span>Create Post</span>
            </button>
          </Dialog.Trigger>

          <button className='sidebar-button' onClick={() => navigate('/')}> 
           <CgFeed  size={20}/>
           <span>Feed</span>
        </button>

          <Dialog.Portal>
            <Dialog.Overlay className="modal-overlay" />
            <Dialog.Content className="modal-content">
              <div className="modal-header">
                <div className="user-info">
                  <Avatar.Root className="modal-avatar-root">
                    <Avatar.Image
                      className="modal-avatar-image"
                      src=""
                      alt="User Avatar"
                    />
                    <Avatar.Fallback className="modal-avatar-fallback">
                      <FiUser />
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <span className="modal-username">{userName}</span>
                </div>
                <Dialog.Close className="modal-close-btn">
                  <FiX size={18} />
                </Dialog.Close>
              </div>

              <textarea
                className="modal-textarea"
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />

              <div className="modal-footer">
                <Dialog.Close asChild>
                  <button className="modal-btn cancel">Cancel</button>
                </Dialog.Close>
                <button
                  className="modal-btn post"
                  onClick={() => {
                    console.log('Post content:', postContent);
                    setPostContent('');
                  }}
                >
                  Post
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <button className="sidebar-button" onClick={() => navigate('/settings')}>
          <FiSettings size={20} />
          <span>Settings</span>
        </button>

      </nav>

      <div className="sidebar-footer">
        <small>© 2025 opponion. All rights reserved.</small>
      </div>
    </aside>
  );
}

export default Sidebar;
