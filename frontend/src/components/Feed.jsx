import React from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import './Feed.css';

function Feed() {
  return (
    <div className="feed-container">
      <ScrollArea.Root className="FeedScrollRoot">
        <ScrollArea.Viewport className="FeedScrollViewport">
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="feed-box">
              <h3>Post #{index + 1}</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical" className="FeedScrollbar">
          <ScrollArea.Thumb className="FeedThumb" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}

export default Feed;
