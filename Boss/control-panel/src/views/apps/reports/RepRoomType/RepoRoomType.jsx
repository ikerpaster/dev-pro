'use client'
import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import QuickSearchToolbarr from 'src/views/apps/user/list/ele/QuickSearchToolbar'
import { Icon, IconButton, Menu, MenuItem } from '@mui/material'
import Link from 'next/link'
import DialogDeleteUser from '../../user/list/ele/DialogDeleteUser'

const RepoRoomType = ({data}) => {
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
   
  

      const getRowId = (row) => {
        return row._id;
      };
      const columns = [
        {
          field: 'ID',
          headerName: 'ID',
          flex: 0.2,
        
        },
  
  
        {
      
          field: 'name',
          headerName: 'Name',
          flex: 1,
           
        },
  
        
        {
         
          field: 'Icon',
          headerName: 'Icon',
          flex: 1,
         
        },
  
   
        {
     
          field: 'description',
          headerName: 'Description',
          flex: 1,
      
        },
   
  
        {
          
          field: '_id',
          headerName: 'Status',
          flex: 1,
          
  
         
        },
        
    
        {
          flex: 0.1,
          minWidth: 90,
          sortable: false,
          field: 'actions',
          headerName: 'actions',
       
        },
      
        ];
  
      
  return (
    <div>
              {data && Array.isArray(data) && data.length > 0 ? (
  <DataGrid
  slots={{ toolbar: QuickSearchToolbarr }}
  autoHeight
  rows={data.map((row, index) => (
    index === 0 ? { id: 'addRow', ...row } : row
  ))}
  checkboxSelection
  disableRowSelectionOnClick
  pageSizeOptions={[10, 25, 50]}
  paginationModel={paginationModel}
  onPaginationModelChange={setPaginationModel}
  getRowId={getRowId}
  rowClassName={(params) => {
    if (params.row.id === 'addRow') {
      return 'custom-row';
    }

    if (params.row.id === 'addRow') {
      return 'custom-row';
    }
    return selectedRowId === params.row.id ? 'selected-row' : '';
  }}

  
  sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
 
    columns={columns}
    className="w-full"
  />
) : (
  <div>No data available</div>
)}


          <div className=''> Room Type reports</div>
    </div>
  )
}
 

export default RepoRoomType

 