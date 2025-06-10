
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";   
import ProfilePage from "../pages/ProfilePage.jsx";
import SettingPage from "../pages/SettingPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import OnboardingPage from "../pages/OnboardingPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx"; 
import MainLayout from "../layout/MainLayout.jsx";


export default function Router() {

  return (
    <Routes>
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
               <MainLayout>
              <HomePage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile/:id" 
        element={
          <ProtectedRoute>
              <MainLayout>
              <ProfilePage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <SettingPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />

      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
