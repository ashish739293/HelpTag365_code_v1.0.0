import React from 'react';

export const RadioButton = ({ label, value, name, selectedValue, onChange ,svgSrc }) => {
    return (
        <label className="flex items-center justify-between w-full p-4 rounded-lg border border-gray-300 cursor-pointer hover:border-blue-500 transition">
        <span className="flex items-center text-gray-800 text-sm font-medium">
            {svgSrc && (
                <img src={`https://support.helptag365.in/assets/uploads/${svgSrc}`} alt={label} className="w-12 h-12 mr-2" />
            )}
            {label}
        </span>
        <input
            type="radio"
            name={name}
            value={value}
            checked={selectedValue === value}
            onChange={onChange}
            className="appearance-none form-radio w-6 h-6 rounded-full border-2 border-gray-400 checked:border-blue-500 checked:bg-blue-500 transition"
        />
    </label>
    );
};

