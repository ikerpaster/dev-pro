import React from 'react';

const DateInput = ({ label, name, value, onChange, required }) => {
  return (
    <div className="">
      <label htmlFor={name} className="formLabel">
        {label}
      </label>
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        required={required}
      />
    </div>
  );
};

export default DateInput;
