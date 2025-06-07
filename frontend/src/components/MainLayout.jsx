// src/components/MainLayout.jsx
import Sidebar from './SideBar'; // Or Navbar if that's what you want
import './MainLayout.css'; // Optional layout styles
import NavBar from './NavBar';
import FollowerPanel from './FollowerPanel';


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
