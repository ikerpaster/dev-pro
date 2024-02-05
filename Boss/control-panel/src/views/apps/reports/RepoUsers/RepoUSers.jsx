'use client'
import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import QuickSearchToolbarr from 'src/views/apps/user/list/ele/QuickSearchToolbar'
import { Card, Grid, Icon, IconButton, Menu, MenuItem } from '@mui/material'
import Link from 'next/link'
import DialogDeleteUser from '../../user/list/ele/DialogDeleteUser'
import TableHeader from '../../permissions/TableHeader'

const RepoUsers = ({data,isLoading,error}) => {
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
   
    const columns = [
 
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
        // renderCell: ({ row }) => <RowOptions id={row._id} />
      }
    
    
      ];

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
    <>
    
    <Grid item xs={12}>
        <Card>
          {/* <CardHeader title='Users' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} /> */}
     
          {/* <Divider /> */}
          <TableHeader 
          value={searchText} 
          handleSearchInputChange={handleSearchInputChange}
          toggle="" setModalOpenAdmin="" />



        

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
        // renderCell: ({ row }) => <RowOptions id={row._id}
        //  />
      }
    ]}
  />
) : (
  <div>No data available</div>
)}



        </Card>
      </Grid>
    
    
    {/* <div>
          {isLoading ? (
  <div>Loading...</div>
) : error ? (
  <div>An error occurred: {error.message}</div>
) : data && Array.isArray(data) && data.length > 0 ? (
  <DataGrid
    autoHeight
    // rows={data} 
    slots={{ toolbar: QuickSearchToolbarr }}
    rows={data}
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

          <div className=''>Users reports</div>
    </div> */}
    </>
  )
}

export default RepoUsers