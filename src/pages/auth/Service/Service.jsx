import { useState, useEffect, useMemo } from 'react';
import { MoveLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { formOptions ,processCards, sliderSettings } from '../../../constants';
import { HOME_PATH, ACTIVE_QR } from '../../../routes';
import { HeroBgSection, Testimony, Checkbox, Input, ModularForm, Select ,GradientSection,Badge,ProcessCard ,QRSection,RadioButton } from '../../../components';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { GET_USER_DETAILS ,UPDATE_USER_DETAILS} from '../../../components/api';

export function Service() {
    const navigate = useNavigate();
    const [selectedReason, setSelectedReason] = useState('');

    const userToken = Cookies.get('token');

    const handleReasonChange = (e) => {
        setSelectedReason(e.target.value);
    };
    // Redirect to login if token is not set
    useEffect(() => {
        if (!userToken) {
            // navigate('/login');
        }
    }, [userToken, navigate]);

   
    const reasons = [
        "My car cannot leave because of your car.",
        "The lights of this car is on.",
        "The car is in no parking.",
        "Something wrong with this car.",
        "The window or car is open.",
        "There is a baby or pet in car."
    ];

  

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(UPDATE_USER_DETAILS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
                body: JSON.stringify()
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || 'Update Successful!', { position: 'top-right' });
            } else if (response.status === 422) {
                toast.error('Please correct the highlighted errors.', { position: 'top-right' });
            } else {
                toast.error(data.message || 'Update failed.', { position: 'top-right' });
            }
        } catch (error) {
            toast.error('An error occurred: ' + error.message, { position: "top-right" });
        }
    };
    
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
                            <h1 className='text-4xl md:text-5xl font-semibold tracking-tight text-primary-darker'>What happened ?</h1>
                            <p className='text-md text-dimmed'>Please Select The Reason Why Do You Want To Contact The Owner.</p>
                        </div>
                        <Testimony wrapperClassName='text-start' startClassName='!justify-start' />
                    </div>
                    <div className='col-span-1 md:col-span-3 lg:col-span-1 xl:px-8'>
                        <ModularForm title={`Select your reason`} description="Please select the reason why do you want to contact the vehicle owner." submitButtonName='Continue' onSubmit={handleSubmit}>
                            
                             <div className="space-y-3">
                                 {reasons.map((reason, index) => (
                                     <RadioButton
                                         key={index}
                                         label={reason}
                                         value={reason}
                                         name="reason"
                                         selectedValue={selectedReason}
                                         onChange={handleReasonChange}
                                     />
                                 ))}
                             </div>
                        </ModularForm>
                    </div>
                </div>
            </HeroBgSection>


            <GradientSection className='!px-0 !py-0'>
                <div className='px-4 md:p-16 py-12 md:py-16 space-y-12 text-center pb-12 md:pb-16'>
                    <div className='flex flex-col justify-center items-center gap-6'>
                        <Badge text='Process' />
                        <h2 className='text-4xl md:text-5xl font-semibold tracking-tight !leading-tight'> How it works ?</h2>
                        <p className='text-md font-medium text-dimmed'>At Helptag 365, we specialize in providing innovative OR sticker solutions designect to enhance safety and streamline communication for the automotivie Industry. Our cutting-edge technology ensures that you can connect with car owners effortlessly, without compromising on privacy</p>
                    </div>
                    {/* <button className="w-full sm:w-fit py-2 px-8 rounded-xl bg-primary-normal hover:bg-primary-normal-hover text-white cursor-pointer">
                        Get a FREE trial
                    </button> */}
                    {/* <TrialButton /> */}
                </div>
                <div className='hidden md:grid px-8 grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        processCards.map((process, index) => <ProcessCard key={index} {...process} />)
                    }
                </div>
                {/* <Slider className='grid md:hidden' {...sliderSettings}>
                    {
                        processCards.map((process, index) => <ProcessCard key={index} {...process} />)
                    }
                </Slider> */}
            </GradientSection>
            <QRSection />

        </main>
    );
}
