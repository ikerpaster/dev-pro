// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
 
import CardHeader from '@mui/material/CardHeader'
 
import { DataGrid } from '@mui/x-data-grid'
 
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
 
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteUser } from 'src/store/apps/user'
// import AddUser from 'src/views/apps/user/list/addUser'
import useSWR from 'swr'

 
 

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};


 
const RowOptions = ({ id }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteUser(id))
    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleRowOptionsClose}
          href=''
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          View
        </MenuItem>
       
         
      </Menu>
    </>
  )
}

 
const UserList = ({ apiData }) => {
  // ** State
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const [isAdmin,setIsAdmin] = useState(false);
  const [isCustomer,setIsCustomer] = useState(false);
  const [isHost,setIsHost] = useState(false);

  const [modalOpenAdmin, setModalOpenAdmin] = useState(false);
  const openModalAdmin = () => {setModalOpenAdmin(true); setIsAdmin(true);}
  const closeModalAdmin = () => {setModalOpenAdmin(false); setIsAdmin(false);}
 

  let url = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/users/deleted`;
 
  
  const { data, isLoading, error:Error } = useSWR(
    url,
    fetcher,
    {
      revalidateOnFocus: true, // Enable real-time revalidation
      fallback: <div>Loading...</div>,
    }
  );

  console.log("RESULTOSS USER:: ", data);


  const getRowId = (row) => {
    return row._id;
  };

 
 
  

  // const handleFilter = useCallback(val => {
  //   setValue(val)
  // }, [])

 

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
          <CardHeader title='Deleted User Info' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
     
          <Divider />
         
        

{data && Array.isArray(data) && data.length > 0 ? (
  <DataGrid
    autoHeight
    rows={data} 
    checkboxSelection
    disableRowSelectionOnClick
    pageSizeOptions={[10, 25, 50]}
    paginationModel={paginationModel}
    onPaginationModelChange={setPaginationModel}
    getRowId={getRowId} // Provide the getRowId function to extract unique IDs
    sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
    columns={[

      { field: 'username', headerName: 'Username', flex: 1 },
      { field: 'ID', headerName: 'ID', flex: 1 },
      { field: '_id', headerName: 'id', flex: 1 },
      { field: 'firstName', headerName: 'First Name', flex: 1 },
      // { field: 'lastName', headerName: 'Last Name', flex: 1 },
      // { field: 'phone', headerName: 'Phone', flex: 1 },
      // { field: 'mobile', headerName: 'Mobile', flex: 1 },
      // { field: 'profile', headerName: 'Profile', flex: 1 },
      // { field: 'country', headerName: 'Country', flex: 1 },
      // { field: 'city', headerName: 'City', flex: 1 },
      // { field: 'email', headerName: 'Email', flex: 1 },
      { field: 'role', headerName: 'Role', flex: 1 },
      // { field: 'status', headerName: 'Status', flex: 1 },
      // { field: 'department', headerName: 'Department', flex: 1 },
      // { field: 'position', headerName: 'Position', flex: 1 },
      // { field: 'workMobile', headerName: 'Work Mobile', flex: 1 },
      // { field: 'telephone', headerName: 'Telephone', flex: 1 },
      // { field: 'tags', headerName: 'Tags', flex: 1 },
      // { field: 'branch', headerName: 'Branch', flex: 1 },
      // { field: 'workLocation', headerName: 'Work Location', flex: 1 },
      // { field: 'joiningDate', headerName: 'Joining Date', flex: 1 },
      // { field: 'contract', headerName: 'Contract', flex: 1 },
      // { field: 'employeeType', headerName: 'Employee Type', flex: 1 },
      // { field: 'workPermitNo', headerName: 'Work Permit No', flex: 1 },
      // { field: 'workPermitExpiry', headerName: 'Work Permit Expiry', flex: 1 },
      // { field: 'visaNo', headerName: 'Visa No', flex: 1 },
      // { field: 'visaExpiry', headerName: 'Visa Expiry', flex: 1 },
      // { field: 'emiratesIdNo', headerName: 'Emirates ID No', flex: 1 },
      // { field: 'passportNo', headerName: 'Passport No', flex: 1 },
      // { field: 'lineManager', headerName: 'Line Manager', flex: 1 },
      // { field: 'nationality', headerName: 'Nationality', flex: 1 },
      // { field: 'gender', headerName: 'Gender', flex: 1 },
      // { field: 'language', headerName: 'Language', flex: 1 },
      // // { field: 'maritalStatus', headerName: 'Marital Status', flex: 1 },
      // { field: 'language', headerName: 'Language', flex: 1 },
      // { field: 'maritalStatus', headerName: 'Marital Status', flex: 1 },
      // { field: 'dateOfBirth', headerName: 'Date of Birth', flex: 1 },
      // { field: 'placeOfBirth', headerName: 'Place of Birth', flex: 1 },
      // { field: 'numOfChildren', headerName: 'Number of Children', flex: 1 },
      // { field: 'homeAddress', headerName: 'Home Address', flex: 1 },
      // { field: 'academicLevel', headerName: 'Academic Level', flex: 1 },
      // { field: 'fieldOfStudy', headerName: 'Field of Study', flex: 1 },
      // { field: 'school', headerName: 'School', flex: 1 },
      // { field: 'privateMobile', headerName: 'Private Mobile', flex: 1 },
      // { field: 'privateEmail', headerName: 'Private Email', flex: 1 },
      // { field: 'emergencyContactName', headerName: 'Emergency Contact Name', flex: 1 },
      // { field: 'emergencyContactNumber', headerName: 'Emergency Contact Number', flex: 1 },
      // { field: 'notes', headerName: 'Notes', flex: 1 },
      // { field: 'authMethod', headerName: 'Authentication Method', flex: 1 },
      // { field: 'isActive', headerName: 'Is Active', flex: 1 },
      // { field: 'isVerified', headerName: 'Is Verified', flex: 1 },
      // { field: 'createdAt', headerName: 'Created At', flex: 1 },
      // { field: 'updatedAt', headerName: 'Updated At', flex: 1 },

      // { field: 'isActive', headerName: 'Is Active', flex: 1 },
      {
            flex: 0.1,
            minWidth: 90,
            sortable: false,
            field: 'actions',
            headerName: 'Actions',
            renderCell: ({ row }) => <RowOptions id={row.id} />
          }

    ]}
  />
) : (
  <div>No data available</div>
)}


        </Card>
      </Grid>

   
      {/* {modalOpenAdmin && <AddUser isOpen={modalOpenAdmin} onClose={closeModalAdmin} />} */}
    </Grid>
  )
}

 
export default UserList
