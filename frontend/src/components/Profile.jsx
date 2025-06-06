import React, { useEffect, useState } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Card } from '@radix-ui/themes';
import { FaRegHeart, FaRegComment } from 'react-icons/fa';
import './Profile.css';
import { FiUser } from 'react-icons/fi';

function Profile() {
  const [isDark, setIsDark] = useState(document.body.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains('dark'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`profile-page ${isDark ? 'dark' : 'light'}`}>
  

      <div className="profile-info">
        <Avatar.Root className="profile-avatar">
          <Avatar.Image
            className="avatar-image"
            src=""
            alt="Profile"
          />
          <Avatar.Fallback className="avatar-fallback"><FiUser size={40}/></Avatar.Fallback>
        </Avatar.Root>

        <h2 className="username">dofiki</h2>
        <p className="bio">hobbyist artist</p>
      </div>

      <div className="posts-section">
        <h3>User Posts</h3>
        <ScrollArea.Root className="PostsScrollRoot">
          <ScrollArea.Viewport className="PostsScrollViewport">
            {[...Array(10)].map((_, index) => (
              <Card key={index} className="post-card">
                <p>This is post #{index + 1} — some engaging content goes here.</p>
                <div className="post-actions">
                  <FaRegHeart />
                  <FaRegComment />
                </div>
              </Card>
            ))}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical" className="PostsScrollbar">
            <ScrollArea.Thumb className="PostsThumb" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>
    </div>
  );
}

export default Profile;
