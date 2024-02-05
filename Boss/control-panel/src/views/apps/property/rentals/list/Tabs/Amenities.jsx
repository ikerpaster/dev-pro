import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';

const Amenities = ({data,purpose, data_amenity,amenitiesInfo, setAmenitiesInfo }) => {
console.log(data);
  const [selectAllCategories, setSelectAllCategories] = useState(false);

 
  useEffect(() => {
    if (purpose === 'edit' && data !== '') {
      const initializeAmenitiesInfo = () => {
        const initialAmenitiesInfo = {};
        Object.keys(data?.amenitiesInfo?.amenities).forEach((category) => {
          const amenitiesList = data.amenitiesInfo.amenities[category];
          initialAmenitiesInfo[category] = amenitiesList.map((amenity) => amenity) || [];
        });
        return initialAmenitiesInfo;
      };

      setAmenitiesInfo(() => initializeAmenitiesInfo());
    }
  }, [data, purpose, setAmenitiesInfo]);


  // useEffect(() => {
  //   if (purpose === 'edit') {
  //     const initializeAmenitiesInfo = () => {
  //       const initialAmenitiesInfo = {};
  //       Object.keys(data?.amenitiesInfo?.amenities).forEach((category) => {
  //         const amenitiesList = data.amenitiesInfo.amenities[category];
  //         initialAmenitiesInfo[category] = amenitiesList.map((amenity) => amenity) || [];
  //       });
  //       return initialAmenitiesInfo;
  //     };

  //     setAmenitiesInfo(() => initializeAmenitiesInfo());
  //   }
  // }, [amenitiesInfo, data_amenity, data]);









  // useEffect(() => {
  //   if(data !==''){

   
  //   const initializeAmenitiesInfo = () => {
  //     const initialAmenitiesInfo = {};
  //     Object.keys(data?.amenitiesInfo?.amenities).forEach((category) => {
  //       const amenitiesList = data?.amenitiesInfo?.amenities[category];
  //       initialAmenitiesInfo[category] = amenitiesList?.filter((amenity) => amenity);
  //     });
  //     return initialAmenitiesInfo;
  //   };

  //   setAmenitiesInfo(() => initializeAmenitiesInfo());

  //   const anyCategoryUnchecked = data_amenity.some(
  //     (categoryData) =>
  //       !amenitiesInfo[categoryData.name] ||
  //       amenitiesInfo[categoryData.name].length !== categoryData.amenities.length
  //   );
  //   if (anyCategoryUnchecked) {
  //     setSelectAllCategories(false);
  //   } else {
  //     const allCategoriesChecked = data_amenity.every(
  //       (categoryData) =>
  //         amenitiesInfo[categoryData.name] &&
  //         amenitiesInfo[categoryData.name].length === categoryData.amenities.length
  //     );
  //     if (allCategoriesChecked) {
  //       setSelectAllCategories(true);
  //     }
  //   }
  // }
  // }, [amenitiesInfo, data_amenity, data]);



  const handleCheckboxChange = (category, item) => {
    setAmenitiesInfo((prevAmenitiesInfo) => {
      const updatedAmenitiesInfo = { ...prevAmenitiesInfo };
      if (!updatedAmenitiesInfo[category]) {
        updatedAmenitiesInfo[category] = []; // Initialize with an empty array
      }
      updatedAmenitiesInfo[category] = updatedAmenitiesInfo[category].includes(item)
        ? updatedAmenitiesInfo[category].filter((i) => i !== item)
        : [...updatedAmenitiesInfo[category], item];
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
        {data_amenity.map((categoryData,i) => (
          <div key={i}>
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
            {categoryData.amenities.map((amenity, i) => (
  <FormControlLabel
    key={i}
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
