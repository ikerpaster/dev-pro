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
import QuickSearchToolbarr from 'src/views/apps/user/list/ele/QuickSearchToolbar'
import TableHeaderRoomList from 'src/views/apps/rooms/list/TableHeader-roomList'
import AddRoomsModel from 'src/views/apps/rooms/list/addROomsModel'



const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};


// const [purpose,setPurpose] = useState(false);

const RowOptions = ({ id,data }) => {
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

  console.log("This is the Data to edit::", data);

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
        
          <AddRoomsModel purpose="edit" data={data} />
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
  const closeModalAdmin = () => { setModalOpenAdmin(false); setIsAdmin(false); }

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

  // Function to filter data based on search text
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const filtered = data.filter((item) => {
        // Customize this condition based on your search requirements
        return (
          item.basicInfo.listingName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.basicInfo.roomType.toLowerCase().includes(searchText.toLowerCase()) ||
          item.basicInfo.propertyName.toLowerCase().includes(searchText.toLowerCase())
          // Add more fields as needed
        );
      });
      setFilteredData(filtered);
    }
  }, [data, searchText]);


 
  const columns = [

    { field: 'ID', headerName: 'ID', flex: 0.4, valueGetter: getRowId }, // Display unique IDs

    

    {
      field: 'descriptionInfo.listingName',
      headerName: 'Listing Name',
      cellClassName: 'wrap-text',
      flex: 1,
      valueGetter: (params) =>
        params.row.basicInfo ? params.row.basicInfo.listingName : '', // Access propertyName safely
    },

    {
      field: 'basicInfo.bedrooms',
      headerName: 'Bedrooms',
      flex: 0.4,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) =>
        params.row.basicInfo ? params.row.basicInfo.bedrooms || '' : '',
    },
    {
      field: 'basicInfo.bathrooms',
      headerName: 'Bathrooms',
      flex: 0.4,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) =>
        params.row.basicInfo ? params.row.basicInfo.bathrooms || '' : '',
    },

    {
      field: 'basicInfo.privateBathroom',
      headerName: 'Private Bathroom',
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) =>
        params.row.basicInfo ? params.row.basicInfo.privateBathroom ? 'Yes' : 'No' : '',
      valueFormatter: (params) =>
        params.value === 'Yes' ? ('yes') : ('No'),
      cellClassName: (params) => (params.value === 'Yes' ? 'green-cell' : 'red-cell'),
    }
    ,

    {
      field: 'basicInfo.roomType',
      headerName: 'Room Type',
      flex: 0.4,
      valueGetter: (params) =>
        params.row.basicInfo ? params.row.basicInfo.roomType || '' : '',
    },
    {
      field: 'basicInfo.accommodates',
      headerName: 'Accommodates',
      flex: 0.4,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) =>
        params.row.basicInfo ? params.row.basicInfo.accommodates || '' : '',
    },

    {
      field: 'basicInfo.book',
      headerName: 'Total Bookings',
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
      renderCell: ({ row }) => <RowOptions id={row._id} data={row} />,
    },


  ];

  // console.log("filter:: ",filteredData);
  // console.log("data::",data);

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

          <TableHeaderRoomList
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
