import React, { useState, useEffect } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { FiMoreVertical, FiUser } from 'react-icons/fi';
import { BiLike, BiCommentDetail } from 'react-icons/bi';
import {
  likePost,
  createComment,
  getAllCommentsFromPost
} from './postboxApi.js';
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
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [cmmt, setCmmt] = useState(false);
  const triggerRefresh = useAuthStore(state => state.triggerRefresh);
  const username = author?.username || 'Unknown User';
  const formattedTime = new Date(createdAt).toLocaleString();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getAllCommentsFromPost(postId);
        setComments(data);

      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };

    fetchComments();
  }, [postId]);

  const handleLike = async () => {
    try {
      const updatedPost = await likePost(postId);
      if (updatedPost?.likes) {
        setLikes(updatedPost.likes);
        triggerRefresh();
      }
    } catch (err) {
      console.error('Failed to like post:', err);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    try {
      const addedComment = await createComment(postId, newComment);
      setComments(prev => [addedComment, ...prev]); 
      setNewComment('');
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  return (
    <>
      <div className="postbox">
        <div className="postbox-header">
          <Avatar.Root className="postbox-avatar">
            <Avatar.Fallback className="postbox-avatar-fallback">
              <FiUser size={20} />
            </Avatar.Fallback>
          </Avatar.Root>
          <div className="postbox-info">
            <div className="postbox-username">{username}</div>
            <div className="postbox-time">{formattedTime}</div>
          </div>
          <div className="postbox-options dark-background">
            <FiMoreVertical size={18} />
          </div>
        </div>

        <div className="postbox-content">{content}</div>

        <div className="postbox-actions">
          <button className="postbox-btn" onClick={handleLike}>
            <BiLike size={18} />
            {likes.length > 0 && (
              <span className="liketxt">{likes.length}</span>
            )}
          </button>
          <button
            className="postbox-btn"
            onClick={() => setCmmt(prev => !prev)}
            aria-expanded={cmmt}
            aria-label="Toggle comments"
          >
            <BiCommentDetail size={18} />
          </button>
        </div>
      </div>

      {cmmt && (
        <div className="postbox commentbox">
          <div className="commentbox-header">
            <input
              type="text"
              className="comment-input"
              placeholder="Add a comment..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
            />
            <button className="comment-add-btn" onClick={handleAddComment}>
              Add Comment
            </button>
           
          </div>

          <div className="comment-list">
            {comments.length === 0 ? (
              <p className="no-comments">No comments yet.</p>
            ) : (
              comments.map(cmt => (
                <div key={cmt._id} className="comment-item">
                  <Avatar.Root className="postbox-avatar">
                    <Avatar.Fallback className="postbox-avatar-fallback">
                      <FiUser size={16} />
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <div className="comment-content">
                    <div className="comment-header">
                      <strong>{cmt.author?.username || 'Anonymous'}</strong>
                      <span className="comment-date">
                        {new Date(cmt.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div>{cmt.text}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default PostBox;
