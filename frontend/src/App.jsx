import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import SettingPage from './pages/SettingPage.jsx';
import NavBar from './components/NavBar.jsx'; 
import SideBar from './components/SideBar.jsx';
import FollowerPanel from './components/FollowerPanel.jsx';
import './App.css';


function App() {
  return (
    < div className="home-layout">
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingPage />} />
      </Routes>
      <SideBar userName="dofiki" />
      <FollowerPanel />
    </Router>
    </div>
  );
}

export default App;
