// ** React Imports
import { useState, useEffect, useCallback } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import Icon from 'src/@core/components/icon'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'
import useSWR from 'swr'
import TableHeader from 'src/views/apps/permissions/TableHeader'
import CardImgTop from 'src/views/ui/cards/basic/CardImgTop'
import DialogDeleteUser from 'src/views/apps/user/list/ele/DialogDeleteUser'
import DialogDeletePermission from 'src/views/apps/roles/ele/DialogDeletePermission'

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

const UserList = ({ apiData }) => {
  const [value, setValue] = useState('')
  let url = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/permissions/all`;

  const { data, isLoading, error:Error } = useSWR(
    url,
    fetcher,
    {
      revalidateOnFocus: true,
      fallback: <div>Loading...</div>,
    }
  );

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])
 
  console.log("permissions:: ",data);
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {apiData && (
          <Grid container spacing={6}>
            {apiData.statsHorizontal.map((item, index) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatisticsHorizontal {...item} icon={<Icon icon={item.icon} />} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Permissions List' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <TableHeader value={value} handleFilter={handleFilter} />
          <Divider />

 

<div className='grid grid-cols-3 gap-3 p-4 text-sm'>
  {data && data.map((item, index) => (
    <div key={index} className='w-full bg-gray-100 p-4 rounded shadow-2xl shadow-gray-300 cursor-pointer hover:bg-violet-50 transition transform ease-in-out duration-300'>
      <div className='w-full flex justify-between items-center'>
        <div className='text-xl font-bold'>{item.RoleId?.name}</div>
        <div className='flex gap-3'> 
          <button className='p-2 bg-violet-300 text-white hover:bg-violet-800 transition transform ease-in-out duration-300 rounded-lg shadow-lg text-xs'>Edit</button>
          <DialogDeletePermission id={item?._id} />
        </div>
      </div>
      {item.permissions && Object.entries(item.permissions).map(([category, categoryData]) => (
        <div key={category} className=''>
          <div className='font-semibold'>{category}</div>
          <div>
            {categoryData && categoryData.subCategories &&
              Object.entries(categoryData.subCategories).map(([subCategory, subCategoryData]) => (
                subCategory !== '_id' && subCategory !== 'selectAll' && subCategoryData &&
                Object.values(subCategoryData.permissions).includes(true) && // Check if at least one permission is true
                <div key={subCategory} className='flex gap-2 items-center'>
                  <div className='py-2'>{subCategory}::</div>
                  <div className='flex gap-2 ml-2'>
                    {subCategoryData.permissions && 
                      Object.entries(subCategoryData.permissions).map(([permission, value]) => (
                        value && 
                        <span key={permission} className='text-blue-500'>
                          {permission}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  ))}
</div>



        
        </Card>
      </Grid>
    </Grid>
  );
}

export default UserList;

{/* <div className=''>
RoleNAme
<div className=''>CategoryName:</div>
<div className=''>SUbCategoryName: can <span>add</span><span>Delete</span><span>Edit</span></div>
</div> */}
