// src/components/PostBox.jsx
import React, { useState } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import { FiMoreVertical, FiUser } from 'react-icons/fi';
import { BiLike, BiCommentDetail } from 'react-icons/bi';
import { likePost } from './postboxApi.js';
import useAuthStore from '../../store/store.js';
import './PostBox.css';

function PostBox({ post }) {
  if (!post) return null;

  const {
    author,
    createdAt = '',
    content = '',
    likes: initialLikes = [],
    _id: postId
  } = post;

  const [likes, setLikes] = useState(initialLikes);
  const triggerRefresh = useAuthStore(state => state.triggerRefresh);

  const username = author?.username || 'Unknown User';
  const avatarUrl = author?.avatarUrl || '';
  const formattedTime = new Date(createdAt).toLocaleString();

  const handleLike = async () => {
    try {
      const updatedPost = await likePost(postId);
      if (updatedPost?.likes) {
        setLikes(updatedPost.likes);
        triggerRefresh(); // to notify others if needed
      }
    } catch (err) {
      console.error('Failed to like post:', err);
    }
  };

  return (
    <div className="postbox">
      <div className="postbox-header">
        <Avatar.Root className="postbox-avatar">
          <Avatar.Image className="postbox-avatar-image" src={avatarUrl} alt="user avatar" />
          <Avatar.Fallback className="postbox-avatar-fallback">
            <FiUser size={20} />
          </Avatar.Fallback>
        </Avatar.Root>
        <div className="postbox-info">
          <div className="postbox-username">{username}</div>
          <div className="postbox-time">{formattedTime}</div>
        </div>
        <div className="postbox-options">
          <FiMoreVertical size={18} />
        </div>
      </div>

      <div className="postbox-content">{content}</div>

      <div className="postbox-actions">
        <button className="postbox-btn" onClick={handleLike}>
          <BiLike size={18} /> {likes.length > 0 && <span className='liketxt'>{likes.length}</span>}
        </button>
        <button className="postbox-btn">
          <BiCommentDetail size={18} />
        </button>
      </div>
    </div>
  );
}

export default PostBox;
