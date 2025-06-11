import React, { useState } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import * as Dialog from '@radix-ui/react-dialog';
import { FiEdit2, FiSettings, FiUser, FiX } from 'react-icons/fi';
import { CgFeed } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import './SideBar.css';
import useAuthStore from '../../store/store.js';
import { createPost } from './postApi.js'; // Import your API function
import Toaster from '../../ui/Toaster.jsx';


function Sidebar({ userName = 'dofiki' }) {
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState('');
  const user = useAuthStore(state => state.user);
  const userId = user?._id;

  // Dialog open state (optional, if you want to control manually)
  const [open, setOpen] = useState(false);
  
  const [toastMessage, setToastMessage] = useState('');
  const [openToast, setOpenToast] = useState(false);
  const triggerRefresh = useAuthStore(state => state.triggerRefresh);
  const showToast = (msg) => {
    setToastMessage(msg);
    setOpenToast(true);
  };


  async function handleCreatePost() {
    if (!postContent.trim()) {
      showToast("Post content can't be empty");
      return;
    }

    try {
      const newPost = await createPost({ content: postContent });
      triggerRefresh(); //
      showToast("Post created!");
      setPostContent('');
      setOpen(false); 
    } catch (error) {
      showToast("Failed to create post: " + error.message);
    }
  }

  return (
    <aside className="sidebar">

      <div
        className="profile-section"
        onClick={() => navigate(`/profile/${userId}`)}
        style={{ cursor: 'pointer' }}
        title="Go to Profile"
      >
        <Avatar.Root className="avatar-root">
          <Avatar.Image className="avatar-image" src="" alt="User Avatar" />
          <Avatar.Fallback className="avatar-fallback">
            <FiUser size={22} />
          </Avatar.Fallback>
        </Avatar.Root>
        <div className="username">{userName}</div>
      </div>

      <nav className="sidebar-nav">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button className="sidebar-button">
              <FiEdit2 size={20} />
              <span>Create Post</span>
            </button>
          </Dialog.Trigger>

          <button className='sidebar-button' onClick={() => navigate('/')}>
            <CgFeed size={20} />
            <span>Feed</span>
          </button>

          <Dialog.Portal>
            <Dialog.Overlay className="modal-overlay" />
            <Dialog.Content className="modal-content">
              <div className="modal-header">
                <div className="user-info">
                  <Avatar.Root className="modal-avatar-root">
                    <Avatar.Image className="modal-avatar-image" src="" alt="User Avatar" />
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
                  onClick={handleCreatePost}
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
      <Toaster message={toastMessage} open={openToast} setOpen={setOpenToast} />
      <div className="sidebar-footer">
        <small>© 2025 opponion. All rights reserved.</small>
      </div>
      

    </aside>

    
  );
}

export default Sidebar;
