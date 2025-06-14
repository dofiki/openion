// src/profile/Profile.jsx
import React, { useEffect, useState } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { FiUser } from 'react-icons/fi';
import './Profile.css';
import useAuthStore from '../../store/store.js';
import {
  fetchCurrentUser,
  fetchUserProfile,
  followUser,
  unfollowUser,
  getUserPosts
} from './profileApi.js';

import Loader from '../../ui/Loader.jsx';
import PostBox from '../../ui/postbox/PostBox.jsx';

function Profile({ userId }) {
  const [isDark, setIsDark] = useState(document.body.classList.contains('dark'));
  const [profile, setProfile] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [postDatas, setPostDatas] = useState([]);
  const refreshKey = useAuthStore(state => state.refreshKey);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains('dark'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const me = await fetchCurrentUser();
        setCurrentUserId(me._id);

        const profileData = await fetchUserProfile(userId);
        setProfile(profileData);

        setIsOwnProfile(profileData._id === me._id);
        setIsFollowing(profileData.followers.includes(me._id));
      } catch (err) {
        console.error('Error loading profile:', err);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getUserPosts(userId);
        setPostDatas(posts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, [userId, refreshKey]);

  const handleToggleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(userId);
        setIsFollowing(false);
      } else {
        await followUser(userId);
        setIsFollowing(true);
      }

      const updatedProfile = await fetchUserProfile(userId);
      setProfile(updatedProfile);
    } catch (err) {
      console.error('Follow/Unfollow error:', err);
    }
  };

  if (!profile) return <Loader isDark={isDark} />;

  return (
    <div className={`profile-page ${isDark ? 'dark' : 'light'}`}>
      <div className="profile-info">
        <Avatar.Root className="profile-avatar">
          <Avatar.Image
            className="avatar-image"
            src={profile.avatarUrl || ''}
            alt="Profile"
          />
          <Avatar.Fallback className="avatar-fallback">
            <FiUser size={40} />
          </Avatar.Fallback>
        </Avatar.Root>

        <h2 className="username">{profile.username}</h2>
        <p className="bio">{profile.bio || 'No bio yet'}</p>

        <p className="stats">
          <span className="stat-item">Followers: {profile.followersCount}</span>
          <span className="stat-item">Following: {profile.followingCount}</span>
        </p>

        {!isOwnProfile && (
          <button className="follow-button" onClick={handleToggleFollow}>
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        )}
      </div>

      <div className="posts-section">
        <h3>User Posts</h3>
        <ScrollArea.Root className="PostsScrollRoot">
          <ScrollArea.Viewport className="PostsScrollViewport">
            {postDatas.length > 0 ? (
              postDatas.map(post => (
                <PostBox key={post._id} post={post} />
              ))
            ) : (
              <p style={{ padding: '1rem' }}>No posts to show.</p>
            )}
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
