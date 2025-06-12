
import Sidebar from '../components/sidebar/SideBar.jsx'; 
import NavBar from '../components/navbar/NavBar.jsx';
import FollowerPanel from '../components/followerpanel/FollowerPanel.jsx';


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
