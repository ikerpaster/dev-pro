import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';

const Amenities = ({ data_amenity,amenitiesInfo, setAmenitiesInfo }) => {

  const [selectAllCategories, setSelectAllCategories] = useState(false);

  // const handleCheckboxChange = (category, item) => {
  //   setAmenitiesInfo((prevAmenitiesInfo) => {
  //     const updatedAmenitiesInfo = { ...prevAmenitiesInfo };
  //     if (!updatedAmenitiesInfo[category]) {
  //       updatedAmenitiesInfo[category] = []; // Initialize with an empty array
  //     }
  //     updatedAmenitiesInfo[category] = updatedAmenitiesInfo[category].includes(item)
  //       ? updatedAmenitiesInfo[category].filter((i) => i !== item)
  //       : [...updatedAmenitiesInfo[category], item];
  //     return updatedAmenitiesInfo;
  //   });
  // };


  // const handleCheckboxChange = (category, item) => {
  //   setAmenitiesInfo((prevAmenitiesInfo) => {
  //     const updatedAmenitiesInfo = { ...prevAmenitiesInfo };
  //     if (!updatedAmenitiesInfo[category]) {
  //       updatedAmenitiesInfo[category] = []; // Initialize with an empty array
  //     }
  //     updatedAmenitiesInfo[category] = updatedAmenitiesInfo[category].includes(item)
  //       ? updatedAmenitiesInfo[category].filter((i) => i !== item)
  //       : [...updatedAmenitiesInfo[category], item];
  //     return updatedAmenitiesInfo;
  //   });
  // };


  const handleCheckboxChange = (category, item) => {
    setAmenitiesInfo((prevAmenitiesInfo) => {
      const updatedAmenitiesInfo = { ...prevAmenitiesInfo };
      if (!updatedAmenitiesInfo[category]) {
        updatedAmenitiesInfo[category] = {};
      }
      updatedAmenitiesInfo[category] = {
        ...updatedAmenitiesInfo[category],
        [item]: !updatedAmenitiesInfo[category][item],
      };
      return updatedAmenitiesInfo;
    });
  };

  
  
  
  const handleCheckAll = (category) => {
    const allAmenities = data_amenity.find((amenityCategory) => amenityCategory.name === category);
    const allAmenityNames = allAmenities?.amenities.map((amenity) => amenity.name) || [];

    setAmenitiesInfo((prevAmenitiesInfo) => {
      const updatedAmenitiesInfo = { ...prevAmenitiesInfo };
      if (
        updatedAmenitiesInfo[category] &&
        updatedAmenitiesInfo[category].length === allAmenityNames.length
      ) {
        delete updatedAmenitiesInfo[category];
      } else {
        updatedAmenitiesInfo[category] = allAmenityNames;
      }
      return updatedAmenitiesInfo;
    });
  };

  const handleCheckAllCategories = () => {
    const allCategoriesInfo = {};

    if (!selectAllCategories) {
      data_amenity.forEach((categoryData) => {
        const allAmenities = categoryData.amenities.map((amenity) => amenity.name);
        allCategoriesInfo[categoryData.name] = allAmenities;
      });
    }

    setAmenitiesInfo(allCategoriesInfo);
    setSelectAllCategories(!selectAllCategories);
  };

  useEffect(() => {
    const anyCategoryUnchecked = data_amenity.some(
      (categoryData) => !amenitiesInfo[categoryData.name] || amenitiesInfo[categoryData.name].length !== categoryData.amenities.length
    );
    if (anyCategoryUnchecked) {
      setSelectAllCategories(false);
    } else {
      const allCategoriesChecked = data_amenity.every(
        (categoryData) => amenitiesInfo[categoryData.name] && amenitiesInfo[categoryData.name].length === categoryData.amenities.length
      );
      if (allCategoriesChecked) {
        setSelectAllCategories(true);
      }
    }
  }, [amenitiesInfo, data_amenity]);

  console.log('Selected Categories:', Object.keys(amenitiesInfo));

  return (
    <div className='bg-white p-4'>
      <h2 className="text-lg font-bold mb-4">Step 4: Amenities  </h2>
   

      <div className="grid grid-cols-1 gap-4 mb-4">
       
  

{data_amenity.map((categoryData) => (
  <div key={categoryData.ID}>
    <div className='flex items-center gap-3 '> 
    <h3 className="font-semibold ">{categoryData.name}</h3>
    <FormControlLabel
      control={
        <Checkbox
          checked={
            amenitiesInfo[categoryData.name] &&
            amenitiesInfo[categoryData.name].length === categoryData.amenities.length
          }
          onChange={() => handleCheckAll(categoryData.name)}
          name={categoryData.name}
        />
      }
      label="Check all"
    />
    </div>
    {categoryData.amenities.map((amenity) => (
      <FormControlLabel
        key={amenity._id}
        control={
          <Checkbox
            checked={amenitiesInfo[categoryData.name]?.includes(amenity.name) || false}
            onChange={() => handleCheckboxChange(categoryData.name, amenity.name)}
            name={amenity.name}
          />
        }
        label={amenity.name}
      />
    ))}
    <hr />
  </div>
))}


      </div>

     
    </div>
  );
};

export default Amenities;
