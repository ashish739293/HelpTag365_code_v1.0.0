import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CONTACT_US_PATH, ABOUT_PATH, REGISTER_PATH, USER_PROFILE, LOGOUT_ROUTE } from '../../routes';
import { TrialButton } from '../Misc/TrialButton';
import { useUserData } from '../../Context';
import Cookies from 'js-cookie';
import { LOGOUT_API } from '../api';
import { toast } from 'react-toastify';
import LanguageDropdown from '../Input/LanguageDropdown';

const userToken = Cookies.get('token');

export function NavbarButtons() {
    const location = useLocation();
    const navigate = useNavigate();
    const { setIsLogin, setUserDetails } = useUserData();
    const isLogin = Cookies.get('isLoggedIn');

    const handleLogout = async () => {
        try {
            const response = await fetch(LOGOUT_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || 'Logout Successful!', { position: "top-right" });
                setUserDetails({}); // Clear user details
                Cookies.remove('isLoggedIn');
                Cookies.remove('token');
                navigate('/'); // Redirect to the dashboard or any other page
            } else {
                toast.error(data.message || 'Logout failed. Please try again.', { position: "top-right" });
            }
        } catch (error) {
            toast.error('An error occurred: ' + error.message, { position: "top-right" });
        }
    };

    // Check if the current path matches the service URL
    const isServicePage = location.pathname.startsWith('/service/');

    return (
        <>
            {isServicePage ? (
                // Show language dropdown instead of buttons
                <LanguageDropdown />
            ) : (
                <>
                    <Link to={ABOUT_PATH} className={`w-full md:w-auto p-3 px-6 bg-white text-darker text-sm font-normal rounded-xl shadow-main text-center ${location.pathname === ABOUT_PATH ? 'opacity-50 line-through' : ''}`}>
                        About us
                    </Link>
                    <Link to={CONTACT_US_PATH} className={`w-full md:w-auto p-3 px-6 bg-white text-darker text-sm font-normal rounded-xl shadow-main text-center ${location.pathname === CONTACT_US_PATH ? 'opacity-50 line-through' : ''}`}>
                        Contact us
                    </Link>
                    {isLogin ? (
                        <>
                            <Link to={USER_PROFILE} className={`w-full md:w-auto p-3 px-6 bg-white text-darker text-sm font-normal rounded-xl shadow-main text-center ${location.pathname === USER_PROFILE ? 'opacity-50 line-through' : ''}`}>
                                Profile
                            </Link>
                            <Link to='#' className={`w-full md:w-auto p-3 px-6 bg-white text-darker text-sm font-normal rounded-xl shadow-main text-center`} onClick={handleLogout}>
                                Logout
                            </Link>
                        </>
                    ) : (
                        <Link to={REGISTER_PATH} className={`w-full md:w-auto p-3 px-6 bg-white text-darker text-sm font-normal rounded-xl shadow-main text-center ${location.pathname === REGISTER_PATH ? 'opacity-50 line-through' : ''}`}>
                            Register
                        </Link>
                    )}
                    {/* <TrialButton /> */}
                </>
            )}
             <TrialButton />

        </>
    );
};
