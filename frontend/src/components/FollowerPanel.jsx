import React from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { FiUser } from 'react-icons/fi';
import './FollowerPanel.css';

function FollowerPanel() {
  const followers = ['Alice', 'Bob', 'Charlie'];
  const following = ['Daisy', 'Edward', 'Fiona'];

  const renderList = (title, items) => (
    <div className="list-group">
      <h3 className="list-title">{title}</h3>
      <ul className="name-list">
        {items.map((name, index) => (
          <li key={index} className="name-item">
            <FiUser className="user-icon" />
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <aside className="follower-panel">
      <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          {renderList('Followers', followers)}
          {renderList('Following', following)}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical" className="ScrollAreaScrollbar">
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </aside>
  );
}

export default FollowerPanel;
