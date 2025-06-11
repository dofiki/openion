import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import { FiMoreVertical, FiUser } from 'react-icons/fi';
import { BiLike, BiCommentDetail } from 'react-icons/bi';
import './PostBox.css';

function PostBox({ post }) {
  if (!post) return null;

const {
  author,
  createdAt = '',
  content = ''
} = post;

  const username = author?.username || 'Unknown User';
  const avatarUrl = author?.avatarUrl || ''; // only if you store avatarUrl in user

  const formattedTime = new Date(createdAt).toLocaleString();

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
        <button className="postbox-btn"><BiLike size={18} /></button>
        <button className="postbox-btn"><BiCommentDetail size={18} /></button>
      </div>
    </div>
  );
}

export default PostBox;
