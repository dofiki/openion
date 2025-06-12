import Login from '../features/auth/Login.jsx'
import BrandPanel from '../components/brandpanel/BrandPanel.jsx'
import "./OnboardingPage.css"


function OnboardingPage() {
  return (
        <div className="onboarding-container">
      <div className="left-panel">
        <BrandPanel />
      </div>
      <div className="right-panel">
        <Login />
      </div>
    </div>


  )
}

export default OnboardingPage
