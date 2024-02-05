'use client'
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
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import Select from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteUser } from 'src/store/apps/user'


// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
 
import useSWR from 'swr'
import DialogDeleteUser from 'src/views/apps/user/list/ele/DialogDeleteUser'
import QuickSearchToolbarr from 'src/views/apps/user/list/ele/QuickSearchToolbar'


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
          href='/apps/user/view/overview'
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          View
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
        
          <DialogDeleteUser id={id} />
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
 
 

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  let url = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/users`;
 
  const { data, isLoading, error } = useSWR(
    url,
    fetcher,
    {
      revalidateOnFocus: true, // Enable real-time revalidation
      fallback: <div>Loading...</div>,
    }
  );

  console.log("USER DATA:: ", data);


  const getRowId = (row) => {
    return row._id;
  };

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);


 
  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  // Function to filter data based on search text
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const filtered = data.filter((item) => {
        // Customize this condition based on your search requirements
        return (
          item.username.toLowerCase().includes(searchText.toLowerCase()) ||
          item.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.lastName.toLowerCase().includes(searchText.toLowerCase())
          // Add more fields as needed
        );
      });
      setFilteredData(filtered);
    }
  }, [data, searchText]);

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
          {/* <CardHeader title='Users' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} /> */}
     
          {/* <Divider /> */}
          <TableHeader 
          value={searchText} 
          handleSearchInputChange={handleSearchInputChange}
          toggle={openModalAdmin} setModalOpenAdmin={setModalOpenAdmin} />



        

{/* {data && Array.isArray(data) && data.length > 0 ? (
  <DataGrid
    autoHeight
    // rows={data} 
    slots={{ toolbar: QuickSearchToolbarr }}
    rows={filteredData}
    checkboxSelection
    disableRowSelectionOnClick
    pageSizeOptions={[10, 25, 50]}
    paginationModel={paginationModel}
    onPaginationModelChange={setPaginationModel}
    getRowId={getRowId} // Provide the getRowId function to extract unique IDs
    sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
    columns={[
      { field: 'ID', headerName: 'ID', flex: 1 },
      { field: 'username', headerName: 'Username', flex: 1 },
   
      // { field: '_id', headerName: 'id', flex: 1 },
      { field: 'firstName', headerName: 'First Name', flex: 1 },
      { field: 'lastName', headerName: 'Last Name', flex: 1 },
      { field: 'phone', headerName: 'Phone', flex: 1 },
      { field: 'mobile', headerName: 'Mobile', flex: 1 },
   
      {
            flex: 0.1,
            minWidth: 90,
            sortable: false,
            field: 'actions',
            headerName: 'Actions',
            renderCell: ({ row }) => <RowOptions id={row._id} />
          }

    ]}
  />
) : (
  <div>No data available</div>
)} */}


{isLoading ? (
  <div>Loading...</div>
) : error ? (
  <div>An error occurred: {error.message}</div>
) : data && Array.isArray(data) && data.length > 0 ? (
  <DataGrid
    autoHeight
    // rows={data} 
    slots={{ toolbar: QuickSearchToolbarr }}
    rows={filteredData}
    checkboxSelection
    disableRowSelectionOnClick
    pageSizeOptions={[10, 25, 50]}
    paginationModel={paginationModel}
    onPaginationModelChange={setPaginationModel}
    getRowId={getRowId} // Provide the getRowId function to extract unique IDs
    sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
    columns={[
      { field: 'ID', headerName: 'ID', flex: 1 },
      { field: 'username', headerName: 'Username', flex: 1 },
   
      // { field: '_id', headerName: 'id', flex: 1 },
      { field: 'firstName', headerName: 'First Name', flex: 1 },
      { field: 'lastName', headerName: 'Last Name', flex: 1 },
      { field: 'phone', headerName: 'Phone', flex: 1 },
      { field: 'mobile', headerName: 'Mobile', flex: 1 },
   
      {
        flex: 0.1,
        minWidth: 90,
        sortable: false,
        field: 'actions',
        headerName: 'Actions',
        renderCell: ({ row }) => <RowOptions id={row._id} />
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
