// src/components/MainLayout.jsx
import Sidebar from '../components/SideBar'; // Or Navbar if that's what you want
import './MainLayout.css'; // Optional layout styles
import NavBar from '../components/NavBar';
import FollowerPanel from '../components/FollowerPanel';


export default function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <NavBar />
      <Sidebar />
      {children}
      <FollowerPanel />
    </div>
  );
}
