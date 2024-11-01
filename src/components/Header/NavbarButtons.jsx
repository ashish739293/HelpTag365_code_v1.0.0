import { Link, useLocation ,useNavigate } from 'react-router-dom';
import { CONTACT_US_PATH, ABOUT_PATH, REGISTER_PATH, USER_PROFILE ,LOGOUT_ROUTE} from '../../routes';
import { TrialButton } from '../Misc/TrialButton';
import { useUserData } from '../../Context';
import Cookies from 'js-cookie';
import { LOGOUT_API } from '../api';
import { toast } from 'react-toastify';
// const navbarLinks = [
//     { title: 'About us', path: ABOUT_PATH },
//     { title: 'Contact us', path: CONTACT_US_PATH },
//     { title: 'Register', path: REGISTER_PATH },
// ];
const userToken = Cookies.get('token');

export function NavbarButtons() {
    const location = useLocation();
    const navigate = useNavigate();
    // const {isLogin} = useUserData();
    const {setIsLogin ,setUserDetails} = useUserData();

    const isLogin = Cookies.get('isLoggedIn');

    // const isLogged = false;
    // const getLinkStyles = (path) => {
    //     const baseStyles = "w-full md:w-auto p-3 px-6 bg-white text-darker text-sm font-normal rounded-xl shadow-main text-center";
    //     const activeStyles = "opacity-50 line-through";
    //     return `${baseStyles} ${location.pathname === path ? activeStyles : ''}`;
    // };

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
                // Success: Show success toast and redirect
                toast.success(data.message || 'Logout Successful!', { position: "top-right" });
                setUserDetails({}); // Clear user details
                Cookies.remove('isLoggedIn');
                Cookies.remove('token');
                navigate('/'); // Redirect to the dashboard or any other page
            } else {
                // Handle error responses from the API
                toast.error(data.message || 'Logout failed. Please try again.', { position: "top-right" });
            }
        } catch (error) {
            // Handle network or unexpected errors
            toast.error('An error occurred: ' + error.message, { position: "top-right" });
        }
    };
    


    return (
        <>
            {/* {
                navbarLinks.map(({ title, path }, index) => (
                    <Link key={index} to={path} className={getLinkStyles(path)}>
                        {title}
                    </Link>
                ))
            } */}

            <Link to={ABOUT_PATH} className={`w-full md:w-auto p-3 px-6 bg-white text-darker text-sm font-normal rounded-xl shadow-main text-center ${location.pathname === ABOUT_PATH ? 'opacity-50 line-through' : ''}`}>
                About us
            </Link>
            <Link to={CONTACT_US_PATH} className={`w-full md:w-auto p-3 px-6 bg-white text-darker text-sm font-normal rounded-xl shadow-main text-center ${location.pathname === CONTACT_US_PATH ? 'opacity-50 line-through' : ''}`} >
                Contact us
            </Link>
            {isLogin ? (
                <>
                <Link to={USER_PROFILE} className={`w-full md:w-auto p-3 px-6 bg-white text-darker text-sm font-normal rounded-xl shadow-main text-center ${location.pathname === USER_PROFILE ? 'opacity-50 line-through' : ''}`}>
                    Profile
                </Link>
                <Link to='#' className={`w-full md:w-auto p-3 px-6 bg-white text-darker text-sm font-normal rounded-xl shadow-main text-center }`} onClick={handleLogout} >
                    Logout
                </Link>
                </>
        ) : (<Link to={REGISTER_PATH} className={`w-full md:w-auto p-3 px-6 bg-white text-darker text-sm font-normal rounded-xl shadow-main text-center ${location.pathname === REGISTER_PATH ? 'opacity-50 line-through' : ''}`}>
                Register
            </Link>)}

            {/* <Link to={USER_PROFILE} className="w-full md:w-auto px-8 py-3 bg-white hover:bg-primary-normal-hover border border-primary-normal-hover text-primary-normal hover:text-white text-sm font-semibold rounded-xl shadow-main text-center">
                Profile
            </Link> */}
            <TrialButton />
        </>
    )
};