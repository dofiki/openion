import React, { useEffect, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { FiUser } from 'react-icons/fi';
import { getFollowers, getFollowing } from './fofoApi';
import './FollowerPanel.css';
import useAuthStore from '../../store/store.js';
import { useNavigate } from 'react-router-dom';

function FollowerPanel() {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useAuthStore((state) => state.user);
  const userId = user?._id;
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      setLoading(true);
      const fetchedFollowers = await getFollowers(userId);
      const fetchedFollowing = await getFollowing(userId);
      setFollowers(fetchedFollowers);
      setFollowing(fetchedFollowing);
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  const renderList = (items) => (
    <ul className="name-list">
      {loading ? (
        <li className="name-item">Loading...</li>
      ) : items.length > 0 ? (
        items.map((user) => (
          <li
            key={user._id}
            className="name-item clickable"
            onClick={() => navigate(`/profile/${user._id}`)} // <-- redirect on click
          >
            <FiUser className="user-icon" />
            <span>{user.username}</span>
          </li>
        ))
      ) : (
        <li className="name-item empty">No users to show</li>
      )}
    </ul>
  );

  return (
    <aside className="follower-panel">
      <Accordion.Root className="AccordionRoot" type="single" collapsible>
        <Accordion.Item className="AccordionItem" value="followers">
          <Accordion.Trigger className="AccordionTrigger">
            Followers: {followers.length}
          </Accordion.Trigger>
          <Accordion.Content className="AccordionContent">
            {renderList(followers)}
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item className="AccordionItem" value="following">
          <Accordion.Trigger className="AccordionTrigger">
            Following: {following.length}
          </Accordion.Trigger>
          <Accordion.Content className="AccordionContent">
            {renderList(following)}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </aside>
  );
}

export default FollowerPanel;
