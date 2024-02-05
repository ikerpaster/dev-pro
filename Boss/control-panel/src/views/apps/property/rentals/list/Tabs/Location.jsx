'use client'


import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import GooglePlacesAutocomplete from './locationGoogle';

const Location = ({ locationInfo, setLocationInfo }) => {
 
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (selected) {
      setLocationInfo({ ...locationInfo, country: selected });
    }
  }, [selected, setLocationInfo, locationInfo]);

 
  return (
    <div className='bg-white p-4'>
      <h2 className="text-lg font-bold mb-4">Step 3: Location Info</h2>
    
    <div className='grid grid-cols-2 gap-3 items-center'>
    
        <Box>
<TextField 
size='small'
 label='City' 
 value={locationInfo.city}
 onChange={(e) => setLocationInfo({ ...locationInfo, city: e.target.value })}
 />
  </Box>
 
<div className=''>
 
              <div className='bg-red-400x'>

              <ReactFlagsSelect
        selected={selected}
        onSelect={(code) => setSelected(code)}
        placeholder="Select Nationality"
        searchable
        id="flags-select"
        className='h-fit text-xs rounded-xl py-2 '
      />
              </div>
</div>
 

      <Box>
<TextField 
size='small'
 label='Address Line 1' 
 value={locationInfo.addressLine1}
          onChange={(e) => setLocationInfo({ ...locationInfo, addressLine1: e.target.value })}
 />

  </Box>

 

      <Box>
<TextField 
size='small'
 label='Address Line 2' 
 value={locationInfo.addressLine2}
 onChange={(e) => setLocationInfo({ ...locationInfo, addressLine2: e.target.value })}
 />

  </Box>

  

        <Box>
<TextField 
size='small'
 label='City/Town/District' 
 value={locationInfo.cityTownDistrict}
 onChange={(e) => setLocationInfo({ ...locationInfo, cityTownDistrict: e.target.value })}
 />

  </Box>

 

        <Box>
<TextField 
size='small'
 label=' State/Province/County/Region' 
 value={locationInfo.stateProvinceCountyRegion}
 onChange={(e) => setLocationInfo({ ...locationInfo, stateProvinceCountyRegion: e.target.value })}
 />

  </Box>


 

      <Box>
<TextField 
size='small'
 label='ZIP/Postal Code' 
 value={locationInfo.zipPostalCode}
 onChange={(e) => setLocationInfo({ ...locationInfo, zipPostalCode: e.target.value })}
 />

  </Box>
  </div>

  <GooglePlacesAutocomplete locationInfo={locationInfo} setLocationInfo={setLocationInfo} />

    </div>
  );
};

export default Location;
