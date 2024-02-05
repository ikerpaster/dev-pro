// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import { DataGrid } from '@mui/x-data-grid'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Actions Imports
import { fetchData, deleteUser } from 'src/store/apps/user'

import useSWR from 'swr'
import DialogDeleteUser from 'src/views/apps/user/list/ele/DialogDeleteUser'
 
import { FormControl, InputLabel, Select, TextField } from '@mui/material'
import RepoRoomType from 'src/views/apps/reports/RepRoomType/RepoRoomType'
import RepoRooms from 'src/views/apps/reports/RepRooms/RepoRooms'
import RepoPropertyType from 'src/views/apps/reports/RepProType/RepoProType'
import RepoProCategory from 'src/views/apps/reports/RepProCatego/RepoProCategory'
import RepoRoomCategory from 'src/views/apps/reports/RepRoomCategory/RepoRoomCategory'
import RepoProperty from 'src/views/apps/reports/RepoProperty/RepoProperty'
import RepoDepartments from 'src/views/apps/reports/RepDepartments/RepoDepartment'
import RepoUsers from 'src/views/apps/reports/RepoUsers/RepoUSers'
import RepoAmenities from 'src/views/apps/reports/RepAmenities/RepoAmenities'
import RepoBedType from 'src/views/apps/reports/RepBedType/RepoBedType'
import { ExitToAppOutlined, ImportExportOutlined, PrintOutlined } from '@mui/icons-material'
 

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

    const [report,setReport] = useState();
const Repo = ['users','properties','rooms','departments','property category','property type','amenities','room type','bed type'];

 
// USERS LIST ====================================================================
let urlUser = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/users`;
 
const { data:dataUser, isLoading:isLoadingUser, error:ErrorUser } = useSWR(
  urlUser,
  fetcher,
  {
    revalidateOnFocus: true, // Enable real-time revalidation
    fallback: <div>Loading...</div>,
  }
);
const resUser = dataUser;
console.log("USER DATA:: ", resUser);


// PROPERTY LIST =======================================================================
  let urlProperty = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/properties/all`;
  const { data:dataProperty, isLoading:isLoadingProperty, error: ErrorProperty } = useSWR(
    urlProperty,
    fetcher,
    {
      revalidateOnFocus: true, // Enable real-time revalidation
      fallback: <div>Loading...</div>,
    }
  );
 const resPro = dataProperty;
 console.log("PROPERTY DATA:: ",resPro);
 

//  DEPARTMENT ==================================================================
 let urlDepartment = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/department/all`;

 const { data:dataDepartment, isLoading:isLoadingDepartment, error:ErrorDepartment } = useSWR(
    urlDepartment,
   fetcher,
   {
     revalidateOnFocus: true, // Enable real-time revalidation
     fallback: <div>Loading...</div>,
   }
 );
const resDepartment = dataDepartment;
console.log("DEPARTMENT DATA:: ", resDepartment);

// AMENITIES =====================================================================
let urlAmenity = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/amenities-category/all/`;
const { data:dataAmenity, isLoading:isLoadingAmenity, error:ErrorAmenity } = useSWR(
   urlAmenity,
  fetcher,
  {
    revalidateOnFocus: true, // Enable real-time revalidation
    fallback: <div>Loading...</div>,
  }
);
const resAmenity = dataAmenity;
console.log("AMENITY DATA:: ", resAmenity);


// ROOMS =====================================================================
let urlRooms = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/rooms/all`;
const { data:dataRooms, isLoading:isLoadingRooms, error:ErrorRooms } = useSWR(
    urlRooms,
  fetcher,
  {
    revalidateOnFocus: true, // Enable real-time revalidation
    fallback: <div>Loading...</div>,
  }
);
const resRooms = dataRooms;
console.log("ROOMS DATA:: ", resRooms);


// PROPERTY CATEGORY =====================================================================
let urlPropertyCategory = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/propert-category/all`;
const { data:dataProCategory, isLoading:isLoadingProCategory, error:ErrorProCategory } = useSWR(
    urlPropertyCategory,
  fetcher,
  {
    revalidateOnFocus: true, // Enable real-time revalidation
    fallback: <div>Loading...</div>,
  }
);
const resProCatego = dataProCategory;
console.log("PROPERTY CATEGORY DATA:: ", resProCatego);

 
// PROPERTY TYPE =====================================================================
let urlPropertyType = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/propert-type/all`;
const { data:dataProType, isLoading:isLoadingProType, error:ErrorProType } = useSWR(
    urlPropertyType,
  fetcher,
  {
    revalidateOnFocus: true, // Enable real-time revalidation
    fallback: <div>Loading...</div>,
  }
);
const resProType = dataProType;
console.log("PROPERTY TYPE DATA:: ", resProType);


// ROOM TYPE =====================================================================
let urlRoomType = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/room-type/all`;
const { data:dataRoomType, isLoading:isLoadingRoomType, error:ErrorRoomType } = useSWR(
    urlRoomType,
  fetcher,
  {
    revalidateOnFocus: true, // Enable real-time revalidation
    fallback: <div>Loading...</div>,
  }
);
const resRoomType = dataRoomType;
console.log("ROOM TYPE DATA:: ", resRoomType);


// BED TYPE =====================================================================
let urlBedType = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/bed-type/all`;
const { data:dataBedType, isLoading:isLoadingBedType, error:ErrorBedType } = useSWR(
    urlBedType,
  fetcher,
  {
    revalidateOnFocus: true, // Enable real-time revalidation
    fallback: <div>Loading...</div>,
  }
);
const resBedType = dataBedType;
console.log("BED TYPE DATA:: ", resBedType);


const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}


  return (
    <Grid container spacing={6}>

<div className='w-full bg-whitex  flex justify-end items-center '>
<div className='w-1/3 flex'>
 
    <div className='flex items-center bg-violet-800x py-1 px-2 rounded-md  gap-3 text-white  '>
        <div className='TABLE_HEADER_ACTIONS h-fit' title="Export"><ExitToAppOutlined /></div>
        <div className='TABLE_HEADER_ACTIONS h-fit' title="Import"><ImportExportOutlined /></div>
        <div className='TABLE_HEADER_ACTIONS h-fit' title="Print"><PrintOutlined /></div>
      </div>
     
          <FormControl fullWidth>
          <InputLabel id='demo-multiple-name-label'>Select Reports</InputLabel>
          <Select
            // multiple
            label='Select Reports'
            className='relative'
            MenuProps={MenuProps}
            id='demo-multiple-name'
            labelId='demo-multiple-name-label'
            value={report}
            onChange={(e) => setReport(e.target.value)}
          >
             {Repo?.map((e,i)=>(
              <MenuItem key={i} value={e}>{e}</MenuItem>
            ))}
 
          </Select>
        
        </FormControl>
          </div>

</div>



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

     
 
             {/* const Repo = ['','','','','','','','','']; */}
            {report === 'room type' && <RepoRoomType data={resRoomType} />}
            {report === 'rooms' && <RepoRooms data={resRooms} /> }
            {report === 'property type' && <RepoPropertyType data={resProType} /> } 
            {report === 'property category' && <RepoProCategory data={resProCatego} /> }
            {report === 'room categry' && <RepoRoomCategory data={resPro} />}
            {report === 'properties' && <RepoProperty data={resPro} /> }
            {report === 'departments' && <RepoDepartments data={resDepartment} /> }
            {report === 'users' && <RepoUsers data={resUser} isLoading={isLoadingUser} error={ErrorUser} /> } 
            {report === 'amenities' && <RepoAmenities data={resPro} /> }
            {/* {report === 'bed category' && <RepoBedCategory data={resPro} /> } */}
            {report === 'bed type' && <RepoBedType data={resBedType} /> } 
              
 
        </Card>
      </Grid>
 
    </Grid>
  )
}


export default UserList
