'use client'
import { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

const SelectRoles = ({ formData, setFormData }) => {
  const [selectedRole, setSelectedRole] = useState('');

  let url = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/roles/all`;

  const { data, error, isValidating } = useSWR(
    url,
    fetcher,
    {
      revalidateOnFocus: true, // Enable real-time revalidation
      fallback: <div>Loading...</div>,
    }
  );

  const handleRoleChange = (event) => {
    const { value } = event.target;
    setSelectedRole(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      roleId: value, // Assuming 'roleId' is the field in your formData for the selected role
    }));
  };

  // console.log("ROLE IDIDID:: ", formData.roleId);
  // console.log("selectedRole:: ",selectedRole);
  return (
    <div className='demo-space-x'>
      <FormControl>
        <InputLabel id='demo-simple-select-outlined-label'>Select Roles</InputLabel>
        <Select
          label='roles'
          value={selectedRole}
          onChange={handleRoleChange}
          labelId='demo-simple-select-outlined-label h-4'
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {data?.map((role, index) => (
            <MenuItem key={index} value={role._id}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectRoles;
