import React from 'react';

const CountryCodeInput = ({ label, name, value, onChange, countryCode, onCountryCodeChange ,placeholder}) => {
  return (
    <div className="bg-white py-3">
      <label htmlFor={name} className="block text-gray-700 font-medium">
        {label} 
      </label>

      <div className='flex w-full bg-red-400x overflow-hidden  items-center  border border-gray-300 rounded-lg'>
        <span>
          <select
            className='py-2 bg-white'
            value={countryCode}
            onChange={onCountryCodeChange}
          >
            <option value="+123">+123</option>
            <option value="+13">+13</option>
            <option value="+111">+111</option>
            <option value="+222">+222</option>
            <option value="+444">+444</option>
          </select>
        </span>
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 outline-none text-sm text-gray-400"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
};

export default CountryCodeInput;
