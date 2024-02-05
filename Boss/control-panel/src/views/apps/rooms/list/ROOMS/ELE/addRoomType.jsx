// components/RegistrationForm.js
'use client'
import { useState } from 'react';

const AddnewRoomType = ({isOpen,onClose}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    images: [],
    country: '',
    state: '',
    city: '',
    zipcode: '',
    type: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevState) => ({
      ...prevState,
      images: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

 
  return (
    <div className="w-full p-6 rounded-lg shadow-lg bg-white mx-auto">
    <form className="p-6 space-y-6 bg-white rounded-lg shadow-lg md:w-96 mx-auto" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="block text-gray-700 font-semibold">Name:</label>
        <input
          type="text"
          name="name"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          required
        />
      </div>
  
      <div className="space-y-2">
        <label className="block text-gray-700 font-semibold">Description:</label>
        <textarea
          name="description"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          onChange={handleChange}
          required
        ></textarea>
      </div>
  
      <div className="space-y-2">
        <label className="block text-gray-700 font-semibold">Images:</label>
        <input
          type="file"
          name="images"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          multiple
          onChange={handleImageChange}
        />
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">Country:</label>
          <input
            type="text"
            name="country"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
        </div>
  
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">State:</label>
          <input
            type="text"
            name="state"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
        </div>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">City:</label>
          <input
            type="text"
            name="city"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
        </div>
  
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">Zipcode:</label>
          <input
            type="text"
            name="zipcode"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
        </div>
      </div>
  
      <div className="space-y-2">
        <label className="block text-gray-700 font-semibold">Type:</label>
        <select
          name="type"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          required
        >
          <option value="">Select type</option>
          <option value="type1">Type 1</option>
          <option value="type2">Type 2</option>
          <option value="type3">Type 3</option>
        </select>
      </div>
  
      <div className="text-center">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
  
  );
};

export default AddnewRoomType;
