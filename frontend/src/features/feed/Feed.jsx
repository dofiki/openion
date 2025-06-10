import React from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import './Feed.css';
import PostBox from '../../ui/PostBox';

function Feed() {
  return (
    <div className="feed-container">
      <ScrollArea.Root className="FeedScrollRoot">
        <ScrollArea.Viewport className="FeedScrollViewport">
          <PostBox />
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical" className="FeedScrollbar">
          <ScrollArea.Thumb className="FeedThumb" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}

export default Feed;
