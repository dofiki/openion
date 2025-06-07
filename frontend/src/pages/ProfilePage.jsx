import React from 'react'
import Profile from '../features/profile/Profile.jsx'
import { useParams } from 'react-router-dom';

function ProfilePage() {
  const { id } = useParams();
  return (
    <div>
      <Profile userId={id} />
    </div>
  )
}

export default ProfilePage
