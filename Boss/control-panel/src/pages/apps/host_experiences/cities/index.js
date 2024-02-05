
import { useState, useEffect, useCallback } from 'react'


import Link from 'next/link'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import { DataGrid } from '@mui/x-data-grid'

import Icon from 'src/@core/components/icon'

import { useDispatch, useSelector } from 'react-redux'

import { fetchData, deleteUser } from 'src/store/apps/user'

import useSWR from 'swr'
import DialogDeleteUser from 'src/views/apps/user/list/ele/DialogDeleteUser'
import QuickSearchToolbarr from 'src/views/apps/user/list/ele/QuickSearchToolbar'

import TableHeaderCITIES from 'src/views/apps/host_experience/cities/TableHeaderCITIES'



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

  const dispatch = useDispatch()


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

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const [modalOpenAdmin, setModalOpenAdmin] = useState(false);
  const openModalAdmin = () => { setModalOpenAdmin(true); setIsAdmin(true); }


  let url = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/rooms/all`;


  const { data, isLoading, error: Error } = useSWR(
    url,
    fetcher,
    {
      revalidateOnFocus: true, // Enable real-time revalidation
      fallback: <div>Loading...</div>,
    }
  );


  const getRowId = (row) => {
    return row._id;
  };

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };


  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const filtered = data.filter((item) => {

        return (
          item.descriptionInfo.listingName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.basicInfo.roomType.toLowerCase().includes(searchText.toLowerCase()) ||
          item.basicInfo.propertyName.toLowerCase().includes(searchText.toLowerCase())

        );
      });
      setFilteredData(filtered);
    }
  }, [data, searchText]);


 
  const columns = [

    { field: 'ID', headerName: 'ID', flex: 0.4, valueGetter: getRowId }, // Display unique IDs

    {
      field: 'basicInfo.propertyName',
      headerName: 'City Name',
      flex: 1,
      valueGetter: (params) =>
        params.row.basicInfo ? params.row.hotelId.name : '', // Access propertyName safely
      cellClassName: 'wrap-text', // Apply a class for wrapping text
    },

    {
      field: 'descriptionInfo.listingName',
      headerName: 'Country',
      cellClassName: 'wrap-text',
      flex: 1,
      valueGetter: (params) =>
        params.row.descriptionInfo ? params.row.descriptionInfo.listingName : '', // Access propertyName safely
    },

    {
      field: 'basicInfo.bedrooms',
      headerName: 'Time Zone',
      flex: 0.4,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) =>
        params.row.basicInfo ? params.row.basicInfo.bedrooms || '' : '',
    },
    {
      field: 'basicInfo.bathrooms',
      headerName: 'Currency',
      flex: 0.4,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) =>
        params.row.basicInfo ? params.row.basicInfo.bathrooms || '' : '',
    },


    {
      field: 'basicInfo.book',
      headerName: 'Status',
      flex: 0.4,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) =>
        params.row.book?.length ? params.row.book.length : 0,
    },


    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      align: 'center',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row._id} />,
    },


  ];

  return (
    <Grid container spacing={6}>


      <Grid item xs={12}>
        <Card>

              <TableHeaderCITIES
            value={searchText}
            handleSearchInputChange={handleSearchInputChange}
            toggle={openModalAdmin}
          />
          
          {data && Array.isArray(data) && data.length > 0 ? (
            <DataGrid
              autoHeight
              slots={{ toolbar: QuickSearchToolbarr }}
              rows={filteredData}
              checkboxSelection
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              getRowId={getRowId} // Provide the getRowId function to extract unique IDs
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}

              columns={columns}
            />
          ) : (
            <div>No data available</div>
          )}

        </Card>
      </Grid>

    </Grid>
  )
}


export default UserList
