// src/components/MainLayout.jsx
import Sidebar from '../components/sidebar/SideBar.jsx'; // Or Navbar if that's what you want
import './MainLayout.css'; // Optional layout styles
import NavBar from '../components/NavBar.jsx';
import FollowerPanel from '../components/FollowerPanel.jsx';


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
