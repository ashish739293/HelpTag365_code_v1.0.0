import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HomePage, LoginPage, NotFoundPage, RegisterPage, AboutPage, ContactUsPage ,Service} from '../pages';
import { ABOUT_PATH, CONTACT_US_PATH, HOME_PATH, LOGIN_PATH, NOT_FOUND_PATH, REGISTER_PATH, USER_PROFILE,ACTIVE_QR ,SERVICE_PATH} from '../routes';
import { ProfilePage } from '../pages/auth/Profile/ProfilePage';
import { ActiveQR } from '../pages/Active/ActiveQR';
import { Footer, Header } from '../components';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <div className="relative h-full w-full grid place-items-center items-start font-['Poppins']">
      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <Routes>
        <Route path={HOME_PATH} element={<HomePage />} />
        <Route path={LOGIN_PATH} element={<LoginPage />} />
        <Route path={REGISTER_PATH} element={<RegisterPage />} />
        <Route path={USER_PROFILE} element={<ProfilePage />} />
        <Route path={ACTIVE_QR} element={<ActiveQR />} />
        <Route path={ABOUT_PATH} element={<AboutPage />} />
        <Route path={CONTACT_US_PATH} element={<ContactUsPage />} />
        <Route path={SERVICE_PATH} element={<Service />} />
        <Route path={NOT_FOUND_PATH} element={<NotFoundPage />} />
      </Routes>
      {
        location.pathname !== NOT_FOUND_PATH
        && location.pathname !== LOGIN_PATH
        && location.pathname !== REGISTER_PATH
        && <Footer />
      }
      <ToastContainer /> {/* Toast container for notifications */}
    </div>
  )
}

export default App
