import { Link, useLocation } from 'react-router-dom';
import { CONTACT_US_PATH, ABOUT_PATH, REGISTER_PATH, USER_PROFILE } from '../../routes';
import { TrialButton } from '../Misc/TrialButton';

// const navbarLinks = [
//     { title: 'About us', path: ABOUT_PATH },
//     { title: 'Contact us', path: CONTACT_US_PATH },
//     { title: 'Register', path: REGISTER_PATH },
// ];

export function NavbarButtons() {
    const location = useLocation();
    const isLogged = false;
    // const getLinkStyles = (path) => {
    //     const baseStyles = "w-full md:w-auto p-3 px-6 bg-white text-darker text-sm font-normal rounded-xl shadow-main text-center";
    //     const activeStyles = "opacity-50 line-through";
    //     return `${baseStyles} ${location.pathname === path ? activeStyles : ''}`;
    // };

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
            {isLogged ? (<Link to={USER_PROFILE} className={`w-full md:w-auto p-3 px-6 bg-white text-darker text-sm font-normal rounded-xl shadow-main text-center ${location.pathname === USER_PROFILE ? 'opacity-50 line-through' : ''}`}>
                Profile
            </Link>) : (<Link to={REGISTER_PATH} className={`w-full md:w-auto p-3 px-6 bg-white text-darker text-sm font-normal rounded-xl shadow-main text-center ${location.pathname === REGISTER_PATH ? 'opacity-50 line-through' : ''}`}>
                Register
            </Link>)}

            {/* <Link to={USER_PROFILE} className="w-full md:w-auto px-8 py-3 bg-white hover:bg-primary-normal-hover border border-primary-normal-hover text-primary-normal hover:text-white text-sm font-semibold rounded-xl shadow-main text-center">
                Profile
            </Link> */}
            <TrialButton />
        </>
    )
};