import { useEffect, useState } from 'react';
import { MoveLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HOME_PATH } from '../../routes';
import { HeroBgSection, Testimony, Input, ModularForm } from './../../components';
import { toast } from 'react-toastify';
import { ACTIVE_QR } from '../../components/api';

const defaultFormData = {
    code: '',
}
export function ActiveQR() {
    const [formData, setFormData] = useState(defaultFormData);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = async (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(ACTIVE_QR, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message || 'QR code activated successfully', { position: "top-right" });
                navigate('/');
            } else {
                toast.error(data.message || 'Login failed', { position: "top-right" });
            }
        } catch (error) {
            toast.error('An error occurred: ' + error.message, { position: "top-right" });
        } finally {
            setIsLoading(false);
        }
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
                            <h1 className='text-4xl md:text-5xl font-semibold tracking-tight text-primary-darker'>Active Your QR Code scanner</h1>
                            <p className='text-md text-dimmed'>Unlock seamless interactions! Our QR code scanner brings efficiency, accuracy, and innovation to your fingertips.</p>
                        </div>
                        <Testimony wrapperClassName='text-start' startClassName='!justify-start' />
                    </div>
                    <div className='col-span-1 md:col-span-3 lg:col-span-1 xl:px-8'>
                        <ModularForm title="Active QR" description="Active Your QR code and Get More" submitButtonName={isLoading ? 'Activating...' : 'Activate'} onSubmit={handleSubmit}>
                            <div className='grid grid-cols-2 gap-x-4 gap-y-2 md:gap-y-4'>
                                <Input wrapperClassName='col-span-2' label="Activaion code" id="code" name="code" type="text" placeholder="Enter Your Code Here" value={formData.code} onChange={handleChange} />
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
