'use client'

import React, { forwardRef, useState } from 'react';
import newRequest from 'src/utils/newRequest';
import SelectVariants from '../permissions/SelectVariants';
import SelectROles from '../permissions/SelectVariants';
// import SelectVariants from 'src/views/forms/form-elements/select/SelectVariants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
// import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'



const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const Role = () => {
  const initialCategoryState = {};
  
  const categories = [
    {
      name: 'Users',
      permissions: [ 'Add', 'Edit', 'Delete', 'View'],
      subCategories: [
        {
          name: 'Users List',
          permissions: [ 'Add', 'Edit', 'Delete', 'View'],
        },
        {
          name: 'Roles and Permissions',
          permissions: [ 'Add', 'Edit', 'Delete', 'View'],
        },
      ],
    },
    {
      name: 'Properties',
      permissions: [ 'Add', 'Edit', 'Delete', 'View'],
      subCategories: [
        {
          name: 'Properties List',
          permissions: [ 'Add', 'Edit', 'Delete', 'View'],
        },
        {
          name: 'Property Type',
          permissions: [ 'Add', 'Edit', 'Delete', 'View'],
        },
        
      ],
    },
    {
      name: 'Room',
      permissions: [ 'Add', 'Edit', 'Delete', 'View'],
      subCategories: [
        {
          name: 'Room List',
          permissions: ['Add', 'Edit', 'Delete', 'View'],
        },
        {
          name: 'Amenities',
          permissions: [ 'Add', 'Edit', 'Delete', 'View'],
        },
        {
          name: 'Bed Type',
          permissions: [ 'Add', 'Edit', 'Delete', 'View'],
        },

        {
          name: 'Room Type',
          permissions: ['Add', 'Edit', 'Delete', 'View'],
        },
        
      ],

    },
    
  ];


  const [categoryStates, setCategoryStates] = useState(initialCategoryState);
  const [allowFullAccess, setAllowFullAccess] = useState(false);
  const [isActive,setIsActive] = useState(false); // State for "Allow Full Access" option

  // const [formData, setFormData] = useState({
  //   roleId: '',
  // });

  const [formData, setFormData] = useState({
    roleName: '',
    description: '',
    status: true, // Default value for status
  });

  const handleChange = (e, field) => {
    const value = e.target.value;

    // Handling switch component's value change
    const newValue = field === 'status' ? e.target.checked : value;

    setFormData(prevData => ({
      ...prevData,
      [field]: newValue,
    }));
  };

const handleActive =()=>{
  setIsActive((prev=>!prev));
}

  const handleAllowFullAccessChange = () => {
    setAllowFullAccess((prevState) => !prevState);
    setCategoryStates((prevState) => {
      const updatedState = { ...prevState };
  
      // Update permissions and selectAll status for all categories and subcategories
      categories.forEach((category) => {
        updatedState[category.name].selectAll = !allowFullAccess; // Invert the selectAll status
        updatedState[category.name].permissions = Object.keys(updatedState[category.name].permissions).reduce(
         
          (acc, permission) => {

            acc[permission] = !allowFullAccess; // Invert the permission status

            return acc;

          },
          {}
        );
  
        category.subCategories.forEach((subCategory) => {

          updatedState[category.name].subCategories[subCategory.name].selectAll = !allowFullAccess; // Invert the selectAll status
          updatedState[category.name].subCategories[subCategory.name].permissions = Object.keys(
            updatedState[category.name].subCategories[subCategory.name].permissions
          ).reduce((acc, permission) => {
            acc[permission] = !allowFullAccess; // Invert the permission status

            return acc; 

          }, {});

        });
      });
  
      return updatedState;
    });
  };

  
  console.log('Category States:', categoryStates);


  categories.forEach((category) => {
    initialCategoryState[category.name] = {
      selectAll: false,
      permissions: category.permissions.reduce((acc, permission) => {
        acc[permission] = false;

        return acc; 

      }, {}),
      subCategories: category.subCategories.reduce((acc, subCategory) => {
        acc[subCategory.name] = {
          selectAll: false,
          permissions: subCategory.permissions.reduce((subAcc, subPermission) => {
            subAcc[subPermission] = false;

            return subAcc; 

          }, {}),
        };

        return acc; 

      }, {}),
    };
  });
 
 // ...

const handleCategorySelectAllChange = (categoryName) => {
  setCategoryStates((prevState) => {
    const updatedState = {
      ...prevState,
      [categoryName]: {
        ...prevState[categoryName],
        selectAll: !prevState[categoryName].selectAll,
        permissions: Object.keys(prevState[categoryName].permissions).reduce(
          (acc, permission) => {
            acc[permission] = !prevState[categoryName].selectAll;

            return acc; 

          },
          {}
        ),
        subCategories: Object.keys(prevState[categoryName].subCategories).reduce(
          (acc, subCategoryName) => {
            acc[subCategoryName] = {
              ...prevState[categoryName].subCategories[subCategoryName],
              selectAll: !prevState[categoryName].selectAll,
              permissions: Object.keys(prevState[categoryName].subCategories[subCategoryName].permissions).reduce(
                (subAcc, permission) => {
                  subAcc[permission] = !prevState[categoryName].selectAll;

                  return subAcc; 

                },
                {}
              ),
            };

            return acc; 

          },
          {}
        ),
      },
    };

    // Update "Allow Full Access" based on whether all categories are checked
    const allCategoriesChecked = Object.values(updatedState).every(
      (category) => category.selectAll
    );
    setAllowFullAccess(allCategoriesChecked);

    return updatedState;
  });
};

// ...


  const handleSubCategorySelectAllChange = (categoryName, subCategoryName) => {
    setCategoryStates((prevState) => {
      const updatedState = {
        ...prevState,
        [categoryName]: {
          ...prevState[categoryName],
          subCategories: {
            ...prevState[categoryName].subCategories,
            [subCategoryName]: {
              ...prevState[categoryName].subCategories[subCategoryName],
              selectAll: !prevState[categoryName].subCategories[subCategoryName].selectAll,
              permissions: Object.keys(
                prevState[categoryName].subCategories[subCategoryName].permissions
              ).reduce((acc, permission) => {
                acc[permission] = !prevState[categoryName].subCategories[subCategoryName]
                  .selectAll;

                return acc; 

              }, {}),
            },
          },
        },
      };
  
      // Update "All permissions of this category" if any subcategory checkbox is unchecked
      if (!updatedState[categoryName].subCategories[subCategoryName].selectAll) {
        updatedState[categoryName].selectAll = false;
        setAllowFullAccess(false);
      } else {
        // Check the category checkbox if all subcategories are checked
        const allSubcategoriesChecked = Object.values(
          updatedState[categoryName].subCategories
        ).every((subCat) => subCat.selectAll); 
        updatedState[categoryName].selectAll = allSubcategoriesChecked;
  
        // Check all category checkboxes if all subcategories of all categories are checked
        const allCategoriesChecked = Object.values(updatedState).every((category) => {
          return Object.values(category.subCategories).every((subCategory) => subCategory.selectAll);
        });
  
        if (allCategoriesChecked) {
          Object.keys(updatedState).forEach((categoryKey) => {
            updatedState[categoryKey].selectAll = true;
          });
          setAllowFullAccess(true); // Check "Allow Full Access" if all subcategories are checked
        }
      }
  
      return updatedState;
    });
  };
  

  const handleSubPermissionChange = (categoryName, subCategoryName, permission) => {
    setCategoryStates((prevState) => {
      const updatedState = {
        ...prevState,
        [categoryName]: {
          ...prevState[categoryName],
          subCategories: {
            ...prevState[categoryName].subCategories,
            [subCategoryName]: {
              ...prevState[categoryName].subCategories[subCategoryName],
              permissions: {
                ...prevState[categoryName].subCategories[subCategoryName].permissions,
                [permission]: !prevState[categoryName].subCategories[subCategoryName]
                  .permissions[permission],
              },
            },
          },
        },
      };
  
      // Update "All permissions of this category" if any subcategory permission is unchecked
      const subCategoryPermissions = updatedState[categoryName].subCategories[subCategoryName].permissions;
      if (!Object.values(subCategoryPermissions).every((value) => value)) {
        updatedState[categoryName].selectAll = false;
        updatedState[categoryName].subCategories[subCategoryName].selectAll = false;
        setAllowFullAccess(false);
      } else {
        // If all subcategory permissions are checked, check the subcategory checkbox
        updatedState[categoryName].subCategories[subCategoryName].selectAll = true;
  
        // Check "All permissions of this category" if all subcategories are checked
        const allSubcategoriesChecked = Object.values(updatedState[categoryName].subCategories).every(
          (subCat) => subCat.selectAll
        );
        updatedState[categoryName].selectAll = allSubcategoriesChecked;
  
        // Check "Allow Full Access" if all permissions are checked
        const allPermissionsChecked = Object.values(updatedState).every((category) =>
          Object.values(category.subCategories).every((subCategory) =>
            Object.values(subCategory.permissions).every((perm) => perm)
          )
        );
  
        if (allPermissionsChecked) {
          setAllowFullAccess(true);
        }
      }
  
      // Check the category checkbox if all subcategories are checked
      const allCategoriesChecked = Object.values(updatedState).every((category) => {
        return Object.values(category.subCategories).every((subCategory) => subCategory.selectAll);
      });
  
      if (allCategoriesChecked) {
        Object.keys(updatedState).forEach((categoryKey) => {
          updatedState[categoryKey].selectAll = true;
        });
        setAllowFullAccess(true); // Check "Allow Full Access" if all subcategories are checked
      }
  
      return updatedState;
    });
  };
  
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };



  const handleSubmit = async(event) => {
    event.preventDefault();

    if(formData.name ==='') {
      return  toast.error('Role Name Field is required!!');
    };
    const roleData = { 
      roleName: formData.roleName,
      description: formData.description,
      permissions: categoryStates,
    };

    console.log("FINAL RESULT WOW:: ", roleData);
      
      try {
     
        const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/admin/permissions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(roleData),
        });
  
        if (!res.ok) {
          const errorData = await res.json(); // Parse error message from JSON response
          throw new Error(errorData.message || 'An error occurred');
        }
  
        const responseData = await res.json(); // Assuming the response is JSON
        const successMessage = responseData.message || 'Permission successful';
  
        toast.success(successMessage);
      } catch (error) {
        console.error('Error sending data to backend:', error);
        // setError(error.message || 'An error occurred');
        toast.error(error.message || 'An error occurred');
      }
  

  };


  console.log('Category States:', categoryStates);

const [isToEdit,setIsToEdit] = useState(false);

  return (
    <div className='container mx-auto   menu'>
    {/* <h1 className='text-3xl font-semibold mb-6'>Role Permissions</h1> */}
    
 

      <form onSubmit={handleSubmit} className='w-full mx-auto  rounded-lg  bg-white '>
  {/* <div className='mb-4'>
    <label className='block text-gray-700 text-sm font-bold mb-2'>Name:</label>
    <input
      type='text'
      name='name'
      value={formData.name}
      onChange={handleInputChange}
      className='w-full border rounded p-2'
    />
  </div> */}
  {/* <div className='mb-4'>
    <label className='block text-gray-700 text-sm font-bold mb-2'>Display Name:</label>
    <input
      type='text'
      name='displayName'
      value={formData.displayName}
      onChange={handleInputChange}
      className='w-full border rounded p-2'
    />
  </div> */}
  {/* <div className='mb-4'>
    <label className='block text-gray-700 text-sm font-bold mb-2'>Description:</label>
    <textarea
      name='description'
      value={formData.description}
      onChange={handleInputChange}
      className='w-full border rounded p-2'
    />

      <SelectVariants />
  </div> */}
<div className='px-10 flex gap-3 py-2'>
<Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <TextField size='small' fullWidth   label='New Role' placeholder='New Role' 
              value={formData.roleName}
              onChange={(e) => handleChange(e, 'roleName')}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField size='small' fullWidth   label='Description' 
               placeholder='this is the property based on Italy'
               value={formData.description}
               onChange={(e) => handleChange(e, 'description')}
                />
            </Grid>
        

</Grid>
{isToEdit ? <button className='py-3 bg-violet-500 px-4 text-white rounded-lg hover:bg-violet-300 transition '>Edit</button> : '' }

</div>


{/* <SelectROles formData={formData} setFormData={setFormData} /> */}
  <div className='mb-3'>
    {/* <label className='block text-gray-700 text-sm font-bold mb-2'>Permissions:</label> */}
    <div className='w-full bg-red-500x'>
      {/* Display the permissions here */}
     
     
      {/* Allow Full Access */}
  
    <div className="w-full p-6 bg-white rounded flex justify-between">
      <div className='flex  items-center gap-3'>
    
 
  <div className="flex items-center">
    <label
      className={`flex items-center cursor-pointer`}
      onClick={handleAllowFullAccessChange}
    >
      <span className={`mr-2 ${!allowFullAccess ? 'text-violet-500' : 'text-gray-500'}`}>Master User</span>
      <div className={`w-12 h-6 rounded-full shadow-inner ${allowFullAccess ? 'bg-violet-500' : 'bg-gray-300'}`}>
        <div
          className={`w-6 h-6 rounded-full transform transition-transform ${
            allowFullAccess ? 'translate-x-6' : 'translate-x-0'
          } ${allowFullAccess ? 'bg-white' : 'bg-gray-400'}`}
        />
      </div>
      <span className={`ml-2 ${allowFullAccess ? 'text-blue-500' : 'text-gray-500'}`}> </span>
    </label>
  </div>
 
  </div>

<div className='flex items-center gap-3'>
<div className="flex items-center ">
    <label
      className={`flex items-center cursor-pointer`}
      onClick={handleActive}
    >
      <span className={`mr-2 ${!isActive ? 'text-violet-500' : 'text-gray-500'}`}>Inactive</span>
      <div className={`w-12 h-6 rounded-full shadow-inner ${isActive ? 'bg-violet-500' : 'bg-gray-300'}`}>
        <div
          className={`w-6 h-6 rounded-full transform transition-transform ${
            isActive ? 'translate-x-6' : 'translate-x-0'
          } ${isActive ? 'bg-white' : 'bg-gray-400'}`}
        />
      </div>
      <span className={`ml-2 ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>Active</span>
    </label>
  </div>

  {/* <SelectROles formData={formData} setFormData={setFormData} /> */}
      
</div>

</div> 





    <table className='w-full border-collapse bg-red-400x'>
  <thead>
    <tr className='bg-violet-500 text-white'>
     
      <th className='py-2 text-left px-2'>Category</th>
      <th className='py-2 px-4x bg-green-400x'>All</th>
      {categories[0].subCategories[0].permissions.map((permission) => (
        <th key={permission} className='py-2 text-center'>
          {permission}
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {categories.map((category) => (
      <React.Fragment key={category.name}>
        <tr>
          <td colSpan={category.subCategories[0].permissions.length + 2}></td>
        </tr>
        <tr>
          <td className='text-lg font-semibold ' colSpan={category.subCategories[0].permissions.length + 1}>
            <label className='flex items-center'>
              <input
                type='checkbox'
                checked={categoryStates[category.name].selectAll}
                onChange={() => handleCategorySelectAllChange(category.name)}
                className='mr-2'
              />
              {category.name}
            </label>
          </td>



        </tr>
        {category.subCategories.map((subCategory) => (
          <tr key={subCategory.name} className='border-b border-gray-300'>
            {/* <td></td> */}
            <td className='py-2'>{subCategory.name}</td>
            <td className='py-2 text-center'>
              <input
                type='checkbox'
                checked={categoryStates[category.name].subCategories[subCategory.name].selectAll}
                onChange={() => handleSubCategorySelectAllChange(category.name, subCategory.name)}
              /> 
              <span className='text-xs ml-1'> All </span>
            </td>
            {subCategory.permissions.map((permission) => (
              <td key={permission} className='py-2 text-center '>
            
                <input
                  type='checkbox'
                  checked={categoryStates[category.name].subCategories[subCategory.name].permissions[permission]}
                  onChange={() => handleSubPermissionChange(category.name, subCategory.name, permission)}
                />
                 <span className='ml-2 text-xs'>{permission} </span> 
              </td>
            ))}
          </tr>
        ))}
      </React.Fragment>
    ))}
  </tbody>
</table>



    </div>
  </div>
  <div className='w-full text-center'>
  <button
    type='submit'
    className='w-1/4 mx-auto bg-violet-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
  >
    Save
  </button>
  </div>
 
</form>



  </div>
);
};

export default Role;
  