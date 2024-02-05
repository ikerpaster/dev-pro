// ** React Imports
import { useState, useEffect, useCallback } from 'react'

import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'

import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'

import { DataGrid } from '@mui/x-data-grid'
import Select from '@mui/material/Select'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

 

import useSWR from 'swr'
import ViewDepartment from 'src/views/apps/user/department/ViewDepartment'

import CustomNameCell from 'src/views/apps/user/department/Cells/NameInput'
import CustomerIconInput from 'src/views/apps/user/department/Cells/IconInput'
import CustomerDescrInput from 'src/views/apps/user/department/Cells/descriptionInput'
import CustomNameCellEdit from 'src/views/apps/user/department/EditRow/NameInput'
import CustomerIconInputEdit from 'src/views/apps/user/department/EditRow/IconInput'
import CustomerDescrInputEdit from 'src/views/apps/user/department/EditRow/descriptionInput'
import TableHeaderDEPARTMENT from 'src/views/apps/user/department/TableHeader-DEPARTMENT'
import QuickSearchToolbarr from 'src/views/apps/user/list/ele/QuickSearchToolbar'
import DialogDeleteDepartment from 'src/views/apps/user/department/ele/DialogDeleteDepartment'


 

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
  // ** State

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })


  let url = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/department/all`;
 
  
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


  const [editButtonClicked, setEditButtonClicked] = useState(false);

  const handleEditButtonClick = () => {
    setEditButtonClicked(true);
  };
  
 const [adding,setAdding] = useState(false);
 const [depData, setDepData] = useState({
  name: '',
  IconDep: '',
  description:''
});




const [editedFields, setEditedFields] = useState({
  name: '',
  IconDep: '',
  description:''
});
const [description, setDescription] = useState();
const [iconUrl, setIconUrl] = useState();
const [depName, setDepatNAme] = useState();
const [showAndHideUpdateBTN,setShowAndHideUpdateBTN] = useState(false);

const [selectedRowId, setSelectedRowId] = useState(null);
const [permissionToEdit, setPermissionToEdit] = useState(false);
const [rowData, setRowData] = useState({});



 const handleAddBTN = ()=>{

  setAdding((prev)=>!prev);
 }
 
 

// END CUSTOMER INPUTS 
const openModalAdmin = () => { setModalOpenAdmin(true); setIsAdmin(true); }
const [searchText, setSearchText] = useState('');
const [filteredData, setFilteredData] = useState([]);

const handleSearchInputChange = (event) => {
  setSearchText(event.target.value);
};



const handleEditCellChange = (params) => {
  alert("ok ok");
  console.log("man man");
  if (params.id === 'addRow') {
    // This is the 'addRow' cell being edited, you can handle this case if needed
    alert("ok");
  } else {
    // For other rows being edited, you can handle the edited value here
    alert(`Edited value: ${params.props.value}`);
    // Here, `params.props.value` contains the edited value
  }
};
 

 


 
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setDepData({ ...depData, [name]: value });
};


 
const [rowToEdit,setRowToEdit] = useState(false);
const RowOptions = ({ id }) => {

  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
   
    
    handleRowOptionsClose()
  }


 
const HandleUpdates = (id) => {
  // alert(id);
  setRowToEdit(id); // Toggle the state when the Edit button is clicked
};


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
           
          sx={{ '& svg': { mr: 2 } }}
       
        >
        
          <ViewDepartment id={id}  />
        </MenuItem>
        <MenuItem onClick={() => HandleUpdates(id)} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>

          <DialogDeleteDepartment id={id} />
        </MenuItem>
      </Menu>
    </>
  )
}

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
           
 
        <TableHeaderDEPARTMENT
            value={searchText}
            handleSearchInputChange={handleSearchInputChange}
            handleAddBTN={handleAddBTN}
            toggle={openModalAdmin}
          />
    

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
  onEditCellChange={handleEditCellChange}
    columns={[
    
      {
        field: 'ID',
        headerName: 'ID',
        flex: 0.2,
        renderCell: ({ row }) => {
          if (adding ? row.id === 'addRow' : '') {
          }
        }
      },


      {
    
        field: 'name',
        headerName: 'Name',
        flex: 1,
        renderCell: ({ row }) => {
          if (adding ? row.id === 'addRow' : '') {
            return <CustomNameCell depData={depData} setDepData={setDepData} handleInputChange={handleInputChange} />;
          }

          if (row._id === rowToEdit) {
            return  <CustomNameCellEdit depName={depName} setDepatNAme={setDepatNAme} />;
              }
              return row.name; 
  
        }
      },

      
      {
       
        field: 'Icon',
        headerName: 'Icon',
        flex: 1,
        renderCell: ({ row }) => {
          if (adding ? row.id === 'addRow' : '') {
            return <CustomerIconInput depData={depData} setDepData={setDepData} handleInputChange={handleInputChange} />;
          }

          if (row._id === rowToEdit) {
            return  <CustomerIconInputEdit  iconUrl={iconUrl} setIconUrl={setIconUrl} />;
              }
              return row.Icon; 
        }
      },

 
      {
   
        field: 'description',
        headerName: 'Description',
        flex: 1,
        renderCell: ({ row }) => {
          if (adding ? row.id === 'addRow' : '') {
            return <CustomerDescrInput depData={depData} setDepData={setDepData} handleInputChange={handleInputChange} />;
          }
          
          if (row._id === rowToEdit) {
            return  <CustomerDescrInputEdit  description={description} setDescription={setDescription} />;
              }
          return row.description; 
          }
      },
 

      {
        
        field: '_id',
        headerName: 'Status',
        flex: 1,
        renderCell: ({ row }) => {
          if (adding ? row.id === 'addRow' : '') {
          }
  
        }

       
      },
      
  

      {
        flex: 0.1,
        minWidth: 90,
        sortable: false,
        field: 'actions',
        headerName: 'actions',
        renderCell: ({ row }) => <RowOptions id={row._id} />,
      },

    ]}
    className="w-full"
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
