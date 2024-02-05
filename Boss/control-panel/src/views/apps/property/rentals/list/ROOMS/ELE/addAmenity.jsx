import { useState } from 'react';
import newRequest from '@/utils/newRequest';

const AddnewAmenity = ({ }) => {
  const [amenityData, setAmenityData] = useState({
    name: '',
    icon: '',
    status: true,
    category: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
          const res = await newRequest.post('/admin/amenities', amenityData);
      console.log('Amenity added successfully:', res.data);

      // Clear the form fields after successful submission
      setAmenityData({
        name: '',
        icon: '',
        status: true,
        category: '',
      });
      alert("succesfully saved!");
 
    } catch (error) {
 
      alert(error);
      console.error('Error adding amenity:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAmenityData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full p-6 rounded-lg shadow-lg bg-white mx-auto">
      <form className="space-y-6 md:w-96 w-full mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-lg font-medium mb-1">
            Amenity Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={amenityData.name}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="icon" className="text-lg font-medium mb-1">
            Icon URL
          </label>
          <input
            type="text"
            name="icon"
            id="icon"
            value={amenityData.icon}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category" className="text-lg font-medium mb-1">
            Category
          </label>
          <select
            name="category"
            id="category"
            value={amenityData.category}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="commonAmenities">Common Amenities</option>
            <option value="additionalAmenities">Additional Amenities</option>
            <option value="specialFeatures">Special Features</option>
            <option value="homeSafety">Home Safety</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddnewAmenity;

