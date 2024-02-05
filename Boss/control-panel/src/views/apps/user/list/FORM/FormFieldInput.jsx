import React from 'react';

// const FormField = ({ label, name, value, onChange, required, type }) => {

  const FormField = ({ label, name, value, onChange, type, as, rows, required }) => {
    
    const InputComponent = as === 'textarea' ? 'textarea' : 'input';

  return (
    <>
    
    <div className="w-full my-2">
      <label htmlFor={name} className="formLabel">
        {label}
      </label>
      <InputComponent
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        rows={rows}
        className="w-full px-3 py-2 border my-1 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        required={required}
      />
    </div>
 

    </>
 
  );
};

export default FormField;
