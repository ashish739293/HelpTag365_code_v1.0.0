import { useState, useEffect, useMemo } from 'react';
import { MoveLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { formOptions } from '../../../constants';
import { HOME_PATH, LOGIN_PATH } from '../../../routes';
import { HeroBgSection, Testimony, Checkbox, Input, ModularForm, Select } from '../../../components';
import { toast } from 'react-toastify';


const defaultFormData = {
    fullName: '',
    phone: '',
    email: '',
    carNumber: '',
    insuranceExpDate: '',
    PUCExpDate: '',
    referralCode: '',
    deliveryAddress: '',
    gender: '',
    bloodGroup: '',
    height: '',
    weight: '',
    state: '',
    city: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
}

export function RegisterPage() {
    const [registerFormData, setRegisterFormData] = useState(defaultFormData);
    const [errors, setErrors] = useState({
        fullName: '',
        phone: '',
        email: '',
        carNumber: '',
        deliveryAddress: '',
        gender: '',
        bloodGroup: '',
        height: '',
        weight: '',
        state: '',
        city: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();
    // const [token, setToken] = useState('');


    const handleChange = (e) => {
        const { name, value } = e.target;
        // setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
        setRegisterFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleCheckboxChange = (e) => {
        setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.checked });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/v1/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerFormData)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || 'Registration Successful!', { position: 'top-right' });
                setRegisterFormData(defaultFormData);
                setErrors({});
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else if (response.status === 422) {
                setErrors(data.errors || {});
                toast.error('Please correct the highlighted errors.', { position: 'top-right' });
            } else {
                toast.error(data.message || 'Registration failed.', { position: 'top-right' });
            }
        } catch (error) {
            setErrors('An error occurred: ' + error.message);
            toast.error('An error occurred: ' + error.message, { position: "top-right" });
        }
    }

    const cityOptions = useMemo(() => {
        const selectedState = formOptions.statesCitiesOptions.find(state => state.value === registerFormData.state);
        return selectedState
            ? selectedState.cities
                .sort((a, b) => a.label.localeCompare(b.label)) // Sort by the 'label' property
            : [];
    }, [registerFormData.state]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <main className='relative w-full h-full px-2.5 md:px-8 overflow-hidden'>
            <HeroBgSection sectionClassName='!pb-2'>
                <div className="md:pt-4 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-2 gap-10 xl:gap-20 overflow-visible">
                    <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col gap-y-10 md:gap-y-16">
                        <button onClick={() => navigate(HOME_PATH)} className='flex justify-start items-center gap-1 text-primary-normal tracking-tight text-sm cursor-pointer'>
                            <MoveLeft size={18} />
                            <p>Back to home</p>
                        </button>
                        <div className='flex flex-col justify-center items-start gap-4'>
                            <h1 className='text-4xl md:text-5xl font-semibold tracking-tight text-primary-darker'>Get registered</h1>
                            <p className='text-md text-dimmed'>Register and Your Help Tag QR Code <br /> After Register, we will send your QR code sticker to you.</p>
                            <p className='text-md font-medium'>Already have an account? <Link to={LOGIN_PATH} className='text-primary-normal cursor-pointer underline'>Login here!</Link></p>
                        </div>
                        <Testimony wrapperClassName='text-start' startClassName='!justify-start' />
                    </div>
                    <div className='col-span-1 md:col-span-3 lg:col-span-1 xl:px-8'>
                        <ModularForm title="Register" description="Register and get your HelpTag QR code." submitButtonName='Register' onSubmit={handleSubmit}>
                            <div className='grid grid-cols-2 gap-x-4 gap-y-2 md:gap-y-4'>
                                <Input wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label="Full name" id="fullName" name="fullName" type="text" placeholder="Your full name" value={registerFormData.fullName} onChange={handleChange} error={errors.fullName} required="true" />
                                <Input wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label="Phone number" id="phone" name="phone" type="number" placeholder="Enter your phone number" value={registerFormData.phone} onChange={handleChange} error={errors.phone} />

                                <Input wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label="Email address" id="email" name="email" type="email" placeholder="example@gmail.com" value={registerFormData.email} onChange={handleChange} error={errors.email} required="true" />

                                <Input wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label="Car number" id="carNumber" name="carNumber" type="text" placeholder="Enter your car number" value={registerFormData.carNumber} onChange={handleChange} error={errors.carNumber} required="true" />

                                <Input wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label="Insurance expiry date" id="insuranceExpDate" name="insuranceExpDate" type="date" placeholder="dd-mm-yyyy" value={registerFormData.insuranceExpDate} onChange={handleChange} error={errors.insuranceExpDate} />

                                <Input wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label="PUC expiry date" id="PUCExpDate" name="PUCExpDate" type="date" placeholder="dd-mm-yyyy" value={registerFormData.PUCExpDate} onChange={handleChange} error={errors.PUCExpDate} />

                                <Input wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label="Referral code" id="referralCode" name="referralCode" type="text" placeholder="Enter referral code" value={registerFormData.referralCode} onChange={handleChange} error={errors.referralCode} />

                                <Input wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label="Delivery address" id="deliveryAddress" name="deliveryAddress" type="text" placeholder="Enter delivery address" value={registerFormData.deliveryAddress} onChange={handleChange} error={errors.deliveryAddress} required="true" />

                                <Select wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label="Gender" id="gender" name="gender" options={formOptions.gender} placeholder="Select your gender" value={registerFormData.gender} onChange={handleChange} error={errors.gender} required="true" />

                                <Select wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label='Blood group' id="bloodGroup" name="bloodGroup" options={formOptions.bloodGroup} placeholder="Select blood group" value={registerFormData.bloodGroup} onChange={handleChange} error={errors.bloodGroup} required="true" />

                                <Select wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label='Height (in inches)' id="height" name="height" options={formOptions.height} placeholder="Select height" value={registerFormData.height} onChange={handleChange} error={errors.height} required="true" />

                                <Select wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label='Weight (in kg)' id="weight" name="weight" options={formOptions.weight} placeholder="Select weight" value={registerFormData.weight} onChange={handleChange} error={errors.weight} required="true" />

                                <Select wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label='State' id="state" name="state" options={formOptions.statesCitiesOptions} placeholder="Select state" value={registerFormData.state} onChange={handleChange} search error={errors.state} required="true" />

                                <Select wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label='City' id="city" name="city" options={cityOptions} placeholder="Select city" value={registerFormData.city} onChange={handleChange} disabled={!registerFormData.state} search error={errors.city} required="true" />

                                <Input wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label="Password" id="password" name="password" type="password" placeholder="Enter password" value={registerFormData.password} onChange={handleChange} error={errors.password} required="true" />

                                <Input wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label="Confirm password" id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm your password" value={registerFormData.password} onChange={handleChange} error={errors.confirmPassword} required="true" />

                                <Checkbox wrapperClassName='col-span-2' label="I agree to the terms & conditions." id="terms" name="terms" isChecked={registerFormData.terms} toggleCheckbox={handleCheckboxChange} />
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
