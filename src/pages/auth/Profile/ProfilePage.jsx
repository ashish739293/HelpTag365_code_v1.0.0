import { useState, useEffect, useMemo } from 'react';
import { MoveLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { formOptions } from '../../../constants';
<<<<<<< HEAD
import { HOME_PATH, ACTIVE_QR } from '../../../routes';
import { HeroBgSection, Testimony, Checkbox, Input, ModularForm, Select } from '../../../components';
import { toast } from 'react-toastify';
import { useUserData } from '../../../Context';
import Cookies from 'js-cookie';
import { GET_USER_DETAILS ,UPDATE_USER_DETAILS} from '../../../components/api';

export function ProfilePage() {
    const { userDetails, setUserDetails } = useUserData();
    const navigate = useNavigate();
    const [registerFormData, setRegisterFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const userToken = Cookies.get('token');

    // Redirect to login if token is not set
    useEffect(() => {
        if (!userToken) {
            navigate('/login');
        }
    }, [userToken, navigate]);

    // Fetch user details only if they are not already available
    useEffect(() => {
        const fetchUserDetails = async () => {
            if (userToken && Object.keys(userDetails).length === 0) {
                try {
                    const response = await fetch(GET_USER_DETAILS, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userToken}`,
                        },
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setUserDetails(data);
                        setRegisterFormData(data); // Populate form with user data
                    } else {
                        // toast.error(data.message, { position: "top-right" });
                        console.log(data.message);
                    }
                } catch (error) {
                    // toast.error('An error occurred: ' + error.message, { position: "top-right" });
                    console.log( error.message);

                }
            } else if (userDetails) {
                // If userDetails is already set, populate the form data directly
                // console.log("Already exits...",userDetails);
                setRegisterFormData(userDetails);
            }
        };

        fetchUserDetails();
    }, [userToken, userDetails, setUserDetails]);
=======
import { HOME_PATH,ACTIVE_QR } from '../../../routes';
import { HeroBgSection, Testimony, Input, ModularForm, Select } from '../../../components';


const defaultFormData = {
    fullName: 'pradiep kumar',
    phone: '7999999999999',
    email: 'pky@3435gmail.com',
    carNumber: 'ABCD123123HI',
    // insuranceExpDate: '14-10-2024',
    // PUCExpDate: '14-10-2024',
    referralCode: 'SGDFHF',
    deliveryAddress: 'Room Number 10, Krishna Paying Guest near BAPS hospital, Aahura Nagar Society, Adajan Gam, Adajan, Surat, Gujarat 395009',
    gender: 'male',
    bloodGroup: 'A+',
    height: '50ft',
    weight: '55kg',
    state: 'U.P.',
    city: 'Kanpur',
}

export function ProfilePage() {
    const [registerFormData, setRegisterFormData] = useState(defaultFormData);
    const navigate = useNavigate();
>>>>>>> origin/main

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

<<<<<<< HEAD
    const handleCheckboxChange = (e) => {
        setRegisterFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.checked
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(UPDATE_USER_DETAILS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
                body: JSON.stringify(registerFormData)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || 'Update Successful!', { position: 'top-right' });
                setErrors({});
            } else if (response.status === 422) {
                setErrors(data.errors || {});
                toast.error('Please correct the highlighted errors.', { position: 'top-right' });
            } else {
                toast.error(data.message || 'Update failed.', { position: 'top-right' });
            }
        } catch (error) {
            setErrors({ general: 'An error occurred: ' + error.message });
            toast.error('An error occurred: ' + error.message, { position: "top-right" });
        }
    };

    // Fetch states
    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/countries/101/states`);
                const data = await response.json();
                setStates(data);
            } catch (error) {
                console.log('Error fetching states: ' + error.message);
            }
        };

        fetchStates();
    }, []);

    const handleStateChange = async (stateId) => {
        setRegisterFormData((prevData) => ({ ...prevData, state_id: stateId, city: '' }));
        if (stateId) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/states/${stateId}/cities`);
                const data = await response.json();
                setCities(data);
            } catch (error) {
                console.log('Error fetching cities: ' + error.message);
            }
        } else {
            setCities([]);
        }
    };
=======
    const cityOptions = useMemo(() => {
        const selectedState = formOptions.statesCitiesOptions.find(state => state.value === registerFormData.state);
        return selectedState
            ? selectedState.cities
                .sort((a, b) => a.label.localeCompare(b.label))
            : [];
    }, [registerFormData.state]);
>>>>>>> origin/main

    useEffect(() => {
        if (registerFormData.state_id) {
            handleStateChange(registerFormData.state_id);
        }
    }, [registerFormData.state_id]); // Dependency on state_id
    
    const isActiveQR = true;

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
                            <h1 className='text-4xl md:text-5xl font-semibold tracking-tight text-primary-darker'>Your Profile</h1>
                            <p className='text-md text-dimmed'>Profile and Your Help Tag QR Code <br /> Profile, we will send your QR code sticker to you.</p>
                        </div>
                        <Testimony wrapperClassName='text-start' startClassName='!justify-start' />
                    </div>
                    <div className='col-span-1 md:col-span-3 lg:col-span-1 xl:px-8'>
<<<<<<< HEAD
                        <ModularForm title={`Welcome, ${registerFormData.name}`} description="Please activate your QR code" submitButtonName='Update' onSubmit={handleSubmit}>
                            {isActiveQR && (
                                <Link to={ACTIVE_QR} className='w-full p-3 bg-primary-normal text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors'>
                                    Activate Your QR
                                </Link>
                            )}
                            <div className='grid grid-cols-2 gap-x-4 gap-y-2 md:gap-y-4'>
                                <Input label="Full name" id="name" name="name" type="text" placeholder="Your full name" value={registerFormData.name} onChange={handleChange} error={errors.name} required />
                                <Input label="Phone number" id="phone" name="phone" type="number" placeholder="Enter your phone number" value={registerFormData.phone} onChange={handleChange} error={errors.phone} />
                                <Input label="Email address" id="email" name="email" type="email" placeholder="example@gmail.com" value={registerFormData.email} onChange={handleChange} error={errors.email} required />
                                <Input label="Car number" id="car_number" name="car_number" type="text" placeholder="Enter your car number" value={registerFormData.car_number} onChange={handleChange} error={errors.car_number} required />
                                <Input label="Insurance expiry date" id="ins_exp_date" name="ins_exp_date" type="date" value={registerFormData.ins_exp_date} onChange={handleChange} error={errors.ins_exp_date} />
                                <Input label="PUC expiry date" id="puc_exp_date" name="puc_exp_date" type="date" value={registerFormData.puc_exp_date} onChange={handleChange} error={errors.puc_exp_date} />
                                <Input label="Referral code" id="referralCode" name="referralCode" type="text" placeholder="Enter referral code" value={registerFormData.referralCode} onChange={handleChange} error={errors.referralCode} />
                                <Input label="Delivery address" id="delivery_address" name="delivery_address" type="text" placeholder="Enter delivery address" value={registerFormData.delivery_address} onChange={handleChange} error={errors.delivery_address} required />
                                <Select label="Gender" id="gender" name="gender" options={formOptions.gender} placeholder="Select your gender" value={registerFormData.gender} onChange={handleChange} error={errors.gender} required />
                                <Select label='Blood group' id="blood_group" name="blood_group" options={formOptions.bloodGroup} placeholder="Select blood group" value={registerFormData.blood_group} onChange={handleChange} error={errors.blood_group} required />
                                <Select wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label='State' id="state_id" name="state_id" options={states.map(state => ({ value: state.id, label: state.name }))} placeholder="Select state" value={registerFormData.state_id} onChange={(e) => handleStateChange(parseInt(e.target.value))} search error={errors.state} required="true" />
                                <Select wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label='City' id="city_id" name="city_id" options={cities.map(city => ({ value: city.id, label: city.name }))} placeholder="Select city" value={registerFormData.city_id} onChange={handleChange} disabled={!registerFormData.state_id} search error={errors.city_id} required="true" />
                                <Select label='Height (in inches)' id="height" name="height" options={formOptions.height} placeholder="Select height" value={registerFormData.height} onChange={handleChange} error={errors.height} required />
                                <Select label='Weight (in kg)' id="weight" name="weight" options={formOptions.weight} placeholder="Select weight" value={registerFormData.weight} onChange={handleChange} error={errors.weight} required />
=======
                        <ModularForm title="Welcome, pradiep kummarr" description="please active your QR code" submitButtonName='update' onSubmit={null}>
                        {isActiveQR ? (<Link to={ACTIVE_QR} className='w-full p-3 bg-primary-normal text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors ' >Activate Your QR</Link>) : ('')}
                            <div className='grid grid-cols-2 gap-x-4 gap-y-2 md:gap-y-4'>
                                <Input wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label="Full name" id="fullName" name="fullName" type="text" placeholder="Your full name" value={registerFormData.fullName} onChange={handleChange} required="true" />
                                <Input wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label="Phone number" id="phone" name="phone" type="number" placeholder="Enter your phone number" value={registerFormData.phone} onChange={handleChange} />

                                <Input wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label="Email address" id="email" name="email" type="email" placeholder="example@gmail.com" value={registerFormData.email} onChange={handleChange} required="true" />

                                <Input wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label="Car number" id="carNumber" name="carNumber" type="text" placeholder="Enter your car number" value={registerFormData.carNumber} onChange={handleChange} required="true" />

                                <Input wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label="Insurance expiry date" id="insuranceExpDate" name="insuranceExpDate" type="date" placeholder="dd-mm-yyyy" value={registerFormData.insuranceExpDate} onChange={handleChange}  />

                                <Input wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label="PUC expiry date" id="PUCExpDate" name="PUCExpDate" type="date" placeholder="dd-mm-yyyy" value={registerFormData.PUCExpDate} onChange={handleChange} />

                                <Input wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label="Referral code" id="referralCode" name="referralCode" type="text" placeholder="Enter referral code" value={registerFormData.referralCode} onChange={handleChange} />

                                <Input wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label="Delivery address" id="deliveryAddress" name="deliveryAddress" type="text" placeholder="Enter delivery address" value={registerFormData.deliveryAddress} onChange={handleChange} required="true" />

                                <Select wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label="Gender" id="gender" name="gender" options={formOptions.gender} placeholder="Select your gender" value={registerFormData.gender} onChange={handleChange} required="true" />

                                <Select wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label='Blood group' id="bloodGroup" name="bloodGroup" options={formOptions.bloodGroup} placeholder="Select blood group" value={registerFormData.bloodGroup} onChange={handleChange} required="true" />

                                <Select wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label='Height (in inches)' id="height" name="height" options={formOptions.height} placeholder="Select height" value={registerFormData.height} onChange={handleChange} required="true" />

                                <Select wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label='Weight (in kg)' id="weight" name="weight" options={formOptions.weight} placeholder="Select weight" value={registerFormData.weight} onChange={handleChange} required="true" />

                                <Select wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label='State' id="state" name="state" options={formOptions.statesCitiesOptions} placeholder="Select state" value={registerFormData.state} onChange={handleChange} search required="true" />

                                <Select wrapperClassName='col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' label='City' id="city" name="city" options={cityOptions} placeholder="Select city" value={registerFormData.city} onChange={handleChange} disabled={!registerFormData.state} search required="true" />
>>>>>>> origin/main
                            </div>
                        </ModularForm>
                    </div>
                </div>
            </HeroBgSection>
        </main>
    );
}
