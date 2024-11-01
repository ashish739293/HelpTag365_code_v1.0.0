import { useState, useEffect } from 'react';
import { MoveLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { HOME_PATH } from '../../routes';
import { HeroBgSection, Testimony, Checkbox, Input, ModularForm } from './../../components';
import { toast } from 'react-toastify';

const defaultFormData = {
    phone: '',
    password: '',
    rememberMe: false
}

export function ActiveQR() {
    const [loginFormData, setLoginFormData] = useState(defaultFormData);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    }

    const handleCheckboxChange = (e) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.checked });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginFormData)
            });

            const data = await response.json();
            if (response.ok) {
                // Success: Save the token, show success toast, and redirect
                toast.success(data.message || 'Login Successful!', { position: "top-right" });
                setLoginFormData(defaultFormData);
                setTimeout(() => {
                    navigate('/'); // Redirect to the dashboard or any other page
                }, 2000); // Wait 2 seconds before redirecting
            } else {
                // Error: Handle invalid credentials or other errors
                // setError(data.message || 'Login failed');
                toast.error(data.message || 'Login failed', { position: "top-right" });
            }
        } catch (error) {
            //   setError('An error occurred: ' + error.message);
            toast.error('An error occurred: ' + error.message, { position: "top-right" });
        }

        setLoginFormData(defaultFormData);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <main className='w-full h-full px-2.5 md:px-8 overflow-hidden'>
            <HeroBgSection>
                <div className="md:pt-4 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-2 gap-10 xl:gap-20">
                    <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col gap-y-10 md:gap-y-16">
                        <button onClick={() => navigate(HOME_PATH)} className='flex justify-start items-center gap-1 text-primary-normal tracking-tight text-sm cursor-pointer'>
                            <MoveLeft size={18} />
                            <p>Back to home</p>
                        </button>
                        <div className='flex flex-col justify-center items-start gap-4'>
                            <h1 className='text-4xl md:text-5xl font-semibold tracking-tight text-primary-darker'>Welcome back</h1>
                            <p className='text-md text-dimmed'>Register and Your Help Tag QR Code <br /> After Register, we will send your QR code sticker to you.</p>
                            <p className='text-md font-medium'>Don’t have an account? <Link to={REGISTER_PATH} className='text-primary-normal cursor-pointer underline'>Register here!</Link></p>
                        </div>
                        <Testimony wrapperClassName='text-start' startClassName='!justify-start' />
                    </div>
                    <div className='col-span-1 md:col-span-3 lg:col-span-1 xl:px-8'>
                        <ModularForm title="Log in" description="Register and your help tag QR code." submitButtonName='Login' onSubmit={handleSubmit}>
                            <div className='grid grid-cols-2 gap-x-4 gap-y-2 md:gap-y-4'>
                                <Input wrapperClassName='col-span-2' label="Phone number" id="phone" name="phone" type="number" placeholder="+91" value={loginFormData.phone} onChange={handleChange} />
                                <Input wrapperClassName='col-span-2' label="Password" id="password" name="password" type="password" placeholder="Enter your password" value={loginFormData.password} onChange={handleChange} />
                                <div className='col-span-2 flex flex-col md:flex-row justify-between'>
                                    <Checkbox wrapperClassName='col-span-2 mb-0 md:mb-2' label="Remember me" id="rememberMe" name="rememberMe" isChecked={loginFormData.rememberMe} toggleCheckbox={handleCheckboxChange} />
                                    <p className='font-medium cursor-pointer'>Forgot your password?</p>
                                </div>
                            </div>
                        </ModularForm>
                    </div>
                    <div className='grid md:hidden grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8'>
                        <Testimony />
                    </div>
                </div>
            </HeroBgSection>
        </main>
    )
}
