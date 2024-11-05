import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserData } from '../../Context';

const LanguageDropdown = () => {

    const { languages ,setSelectedLanguage ,selectedLanguage} = useUserData();
    const location = useLocation();
    console.log(selectedLanguage);
    const handleLanguageChange = (e) => {
        const selectedLang = languages.find(lang => lang.id === parseInt(e.target.value));
        setSelectedLanguage(selectedLang);
        // Here you can add additional logic to handle the language change (e.g., store it in context, local storage, etc.)
    };

    return (
        <div className="relative inline-block w-full md:w-auto">
        {selectedLanguage && (
            <select
                value={selectedLanguage.id}
                onChange={handleLanguageChange}
                className="w-full p-3 px-6 bg-white text-darker text-sm font-normal rounded-xl shadow-main text-center cursor-pointer"
            >
                {languages?.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                        {lang.label}
                    </option>
                ))}
            </select>
             )}
         </div>
    );
};

export default LanguageDropdown;
