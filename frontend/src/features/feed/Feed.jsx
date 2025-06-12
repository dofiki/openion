import React, { useEffect, useState } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import './Feed.css';
import PostBox from '../../ui/PostBox.jsx';
import { getFeed } from './feedApi.js';
import useAuthStore from '../../store/store.js';
import Loader from '../../ui/Loader.jsx'; // adjust path if needed

function Feed() {
  const user = useAuthStore((state) => state.user);
  const userId = user?._id;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchFeed = async () => {
      setLoading(true);
      const feed = await getFeed(userId);
      setPosts(feed);
      setLoading(false);
    };

    fetchFeed();
  }, [userId]);

  if (loading) {
    return <Loader isDark={true} />; // or false, depending on your theme context
  }

  return (
    <div className="feed-container">
      <ScrollArea.Root className="FeedScrollRoot">
        <ScrollArea.Viewport className="FeedScrollViewport">
          {loading ? (
            <div className="feed-loading">Loading feed...</div>
          ) : posts.length === 0 ? (
            <div className="feed-empty">No posts yet.</div>
          ) : (
            posts.map((post) => (
              <PostBox key={post._id} post={post} />
            ))
          )}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical" className="FeedScrollbar">
          <ScrollArea.Thumb className="FeedThumb" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}

export default Feed;
