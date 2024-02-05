// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
 
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
 
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

 
import useSWR from 'swr'
 
import DialogDeleteROle from 'src/views/apps/roles/ele/DialogDeleteRole'
 
import TableHeaderROle from 'src/views/apps/permissions/TableHeaderRole'
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
        
          <DialogDeleteROle id={id} />
        </MenuItem>
      </Menu>
    </>
  )
}

 
const RolesComponent = ({ apiData }) => {

  
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

 
  const openModalAdmin = () => {setModalOpenAdmin(true); setIsAdmin(true);}
 
  let url = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/roles/all`;
 
  
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
 
          <TableHeaderROle 
           toggle={openModalAdmin}   />
        

{data && Array.isArray(data) && data.length > 0 ? (
  <DataGrid
  slots={{ toolbar: QuickSearchToolbarr }}
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
      { field: 'ID', headerName: 'ID', flex: 0.3 },
      { field: 'name', headerName: 'Name', flex: 0.5 },
      { field: '_id', headerName: 'Users', flex: 0.3 },
   
      // { field: '_id', headerName: 'id', flex: 1 },
  
      { field: 'status', headerName: 'Status', flex: 0.4 },
      { field: 'description', headerName: 'Description', flex: 1 },
      { field: 'createdAt', headerName: 'Date', flex: 1 },
    
  
     

      // { field: 'isActive', headerName: 'Is Active', flex: 1 },
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
 
    </Grid>
  )
}

 
export default RolesComponent
