'use client'
import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import QuickSearchToolbarr from 'src/views/apps/user/list/ele/QuickSearchToolbar'
import { Icon, IconButton, Menu, MenuItem } from '@mui/material'
import Link from 'next/link'
import DialogDeleteUser from '../../user/list/ele/DialogDeleteUser'

const RepoRooms = ({data}) => {
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
   
    const getRowId = (row) => {
      return row._id;
    };

    const columns = [

      { field: 'ID', headerName: 'ID', flex: 0.4, valueGetter: getRowId }, // Display unique IDs
  
      {
        field: 'basicInfo.propertyName',
        headerName: 'Property Name',
        flex: 1,
        valueGetter: (params) =>
          params.row.basicInfo ? params?.row?.hotelId?.name : '', // Access propertyName safely
        cellClassName: 'wrap-text', // Apply a class for wrapping text
      },
  
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
        // renderCell: ({ row }) => <RowOptions id={row._id} />,
      },
  
  
    ];
   

      
  return (
    <div>
       {data && Array.isArray(data) && data.length > 0 ? (
            <DataGrid
              autoHeight
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

          <div className=''>Rooms reports</div>
    </div>
  )
}

export default RepoRooms