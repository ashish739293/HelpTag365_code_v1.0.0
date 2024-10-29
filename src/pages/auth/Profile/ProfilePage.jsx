import { useState, useEffect, useMemo } from 'react';
import { MoveLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { formOptions } from '../../../constants';
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        // setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
        setRegisterFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const cityOptions = useMemo(() => {
        const selectedState = formOptions.statesCitiesOptions.find(state => state.value === registerFormData.state);
        return selectedState
            ? selectedState.cities
                .sort((a, b) => a.label.localeCompare(b.label))
            : [];
    }, [registerFormData.state]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
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
