'use client'
import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import QuickSearchToolbarr from 'src/views/apps/user/list/ele/QuickSearchToolbar'
import { Icon, IconButton, Menu, MenuItem } from '@mui/material'
import Link from 'next/link'
import DialogDeleteUser from '../../user/list/ele/DialogDeleteUser'

const RepoRoomCategory = ({data}) => {
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
   
    const columns = [
 
        {
          field: 'ID',
          headerName: 'Property Name',
          flex: 1,
          valueGetter: (params) =>
            params.row.ID ? params?.row?.ID : '', // Access propertyName safely
          cellClassName: 'wrap-text', // Apply a class for wrapping text
        },
    
    
        {
          field: 'proInfo.proName',
          headerName: 'Property Name',
          flex: 1,
          valueGetter: (params) =>
            params.row.proInfo ? params?.row?.proInfo?.proName : '', // Access propertyName safely
          cellClassName: 'wrap-text', // Apply a class for wrapping text
        },
    
        {
          field: 'proInfo.proCategory',
          headerName: 'Property Category',
          flex: 1,
          valueGetter: (params) =>
            params.row.proInfo ? params?.row?.proInfo?.proCategory : '', // Access propertyName safely
          cellClassName: 'wrap-text', // Apply a class for wrapping text
        },
    
        {
          field: 'proInfo.proType',
          headerName: 'Property Type',
          flex: 1,
          valueGetter: (params) =>
            params.row.proInfo ? params?.row?.proInfo?.proType : '', // Access propertyName safely
          cellClassName: 'wrap-text', // Apply a class for wrapping text
        },
        
    
        {
          field: 'proInfo.proBuildingNumbers',
          headerName: 'Buildings Number',
          flex: 1,
          headerAlign: 'center', 
          align: 'center',
          valueGetter: (params) =>
            params.row.proInfo ? params?.row?.proInfo?.proBuildingNumbers : '', // Access propertyName safely
          cellClassName: 'wrap-text', // Apply a class for wrapping text
        },
    
        {
          field: 'proInfo.proFloorNumbers',
          headerName: 'Floor Numbers',
          headerAlign: 'center', 
          flex: 1,
          align: 'center',
          valueGetter: (params) =>
            params.row.proInfo ? params?.row?.proInfo?.proFloorNumbers : '', // Access propertyName safely
          cellClassName: 'wrap-text', // Apply a class for wrapping text
        },
    
        {
          flex: 0.1,
          minWidth: 90,
          sortable: false,
          field: 'actions',
          align: 'center',
          headerName: 'Actions',
        //   renderCell: ({ row }) => <RowOptions id={row._id} />,
        },
    
    
      ];

      const getRowId = (row) => {
        return row._id;
      };

      
  return (
    <div>
         {data && Array.isArray(data) && data.length > 0 ? (
            <>
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
            </>
          
          ) : (
            <div>No data available</div>
          )}

          <div className=''>Room Category reports</div>
    </div>
  )
}

export default RepoRoomCategory