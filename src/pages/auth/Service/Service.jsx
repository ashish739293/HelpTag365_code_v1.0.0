import { useState, useEffect } from 'react';
import { MoveLeft } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formOptions, processCards, sliderSettings } from '../../../constants';
import { HOME_PATH, ACTIVE_QR } from '../../../routes';
import { HeroBgSection, Testimony, ModularForm, GradientSection, Badge, ProcessCard, QRSection, RadioButton } from '../../../components';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { UPDATE_USER_DETAILS } from '../../../components/api';
import { NotFoundPage } from '../../Error/NotFoundPage';
import { useUserData } from '../../../Context';

export function Service() {
const navigate = useNavigate();
const [selectedReason, setSelectedReason] = useState('');
const [data, setData] = useState(null);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false); // New state for button loading
const { id } = useParams();
const { setLanguages, selectedLanguage, setSelectedLanguage } = useUserData();

const userToken = Cookies.get('token');

const handleReasonChange = (e) => {
setSelectedReason(e.target.value);
};

useEffect(() => {
const getServices = async () => {
try {
const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/service/${id}`);
const data = await response.json();
if (data?.error && data.error === "QR code not found") {
setError(data.error);
} else {
setSelectedLanguage(data.language[0]);
setData(data);
setLanguages(data.language);
}
} catch (error) {
setError(error.message);
console.log('Error fetching states: ' + error.message);
}
};

getServices();
}, [id]);

const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true); // Set loading to true when submit starts

try {
const response = await fetch(UPDATE_USER_DETAILS, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${userToken}`,
},
body: JSON.stringify({ reason: selectedReason })
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
} finally {
setLoading(false); // Reset loading state once response is received
}
};

if (error) {
return <NotFoundPage />;
}

if (!data) {
return <div>Loading...</div>;
}

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
<ModularForm
title={`Select your reason`}
description="Please select the reason why do you want to contact the vehicle owner."
submitButtonName='Continue'
onSubmit={handleSubmit}
buttonDisabled={loading} // Disable the button while loading
>
<div className="space-y-3">
{data.services.map((service) => {
const translation = data.services_lang.find(
(lang) => lang.services_id === service.id && lang.lang_id === selectedLanguage.id
);

return (
translation && (
<RadioButton
key={service.id}
label={translation.label}
value={service.id}
name="reason"
selectedValue={selectedReason}
onChange={() => setSelectedReason(service.id)}
svgSrc={service.media}
/>
)
);
})}
</div>
</ModularForm>
</div>
</div>
</HeroBgSection>
<GradientSection className='!px-0 !py-0'>
<div className='px-4 md:p-16 py-12 md:py-16 space-y-12 text-center pb-12 md:pb-16'>
<div className='flex flex-col justify-center items-center gap-6'>
<Badge text='Process' />
<h2 className='text-4xl md:text-5xl font-semibold tracking-tight !leading-tight'>How it works?</h2>
<p className='text-md font-medium text-dimmed'>
At Helptag 365, we specialize in providing innovative OR sticker solutions designed to enhance safety and streamline communication for the automotive industry. Our cutting-edge technology ensures that you can connect with car owners effortlessly, without compromising on privacy.
</p>
</div>
</div>
<div className='hidden md:grid px-8 grid-cols-2 lg:grid-cols-3 gap-6'>
{processCards.map((process, index) => <ProcessCard key={index} {...process} />)}
</div>
</GradientSection>
<QRSection />
</main>
);
}

