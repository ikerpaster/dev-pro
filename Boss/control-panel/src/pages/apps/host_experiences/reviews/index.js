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
 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

 
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteUser } from 'src/store/apps/user'

 
import useSWR from 'swr'
import DialogDeleteUser from 'src/views/apps/user/list/ele/DialogDeleteUser'
 
import CustomNameCell from 'src/views/apps/user/department/Cells/NameInput'
import CustomerIconInput from 'src/views/apps/user/department/Cells/IconInput'
import CustomerDescrInput from 'src/views/apps/user/department/Cells/descriptionInput'
import CustomNameCellEdit from 'src/views/apps/user/department/EditRow/NameInput'
import CustomerIconInputEdit from 'src/views/apps/user/department/EditRow/IconInput'
import CustomerDescrInputEdit from 'src/views/apps/user/department/EditRow/descriptionInput'
 
import CustomCategoryCell from 'src/views/apps/user/department/Cells/CategoryInput'
 
import CustomerCategoryInputEdit from 'src/views/apps/user/department/EditRow/categoryInput'
 
import QuickSearchToolbarr from 'src/views/apps/user/list/ele/QuickSearchToolbar'
import TableHeaderRIVIEWS from 'src/views/apps/host_experience/reviews/TableHeaderRIVIEW'


// ** Vars
const userRoleObj = {
  admin: { icon: 'mdi:laptop', color: 'error.main' },
  host: { icon: 'mdi:cog-outline', color: 'warning.main' },
  editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  customer: { icon: 'mdi:chart-donut', color: 'success.main' },
  subscriber: { icon: 'mdi:account-outline', color: 'primary.main' }
}

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))


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


  let url = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/amenities/all`;
 
  
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
  description:'',
  catName:''
});


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


// const [editedFields, setEditedFields] = useState();
const openModalAdmin = () => { setModalOpenAdmin(true); setIsAdmin(true); }
const [searchText, setSearchText] = useState('');
const [filteredData, setFilteredData] = useState([]);

const handleSearchInputChange = (event) => {
  setSearchText(event.target.value);
};

const [editedFields, setEditedFields] = useState({
  name: '',
  IconDep: '',
  description:''
});
const [description, setDescription] = useState();
const [iconUrl, setIconUrl] = useState();
const [depName, setDepatNAme] = useState();
const [cateName, setCateName] = useState();
const [showAndHideUpdateBTN,setShowAndHideUpdateBTN] = useState(false);

const [selectedRowId, setSelectedRowId] = useState(null);
const [permissionToEdit, setPermissionToEdit] = useState(false);
const [rowData, setRowData] = useState({});



 const handleAddBTN = ()=>{
  // alert("clicked to true")
  setAdding((prev)=>!prev);
 }
 
 
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
 



const handleRowClick = (id, row) => {
  setSelectedRowId(id);
  setPermissionToEdit(true);
  setEditedFields({
    id:id,
    // name: row.name,
    // Icon: row.Icon,
    // description: row.description,
  });
};


 
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setDepData({ ...depData, [name]: value });
};


const handleInputChangeEd = (e) => {
  const { name, value } = e.target;
  setEditedFields({ ...rowToEdit, [name]: value });
};

 

 

const [rowToEdit,setRowToEdit] = useState(false);
const HandleUpdates = (id) => {
  // alert(id);
  setRowToEdit(id); // Toggle the state when the Edit button is clicked
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
        
 
 


        <TableHeaderRIVIEWS
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
        flex: 0.4,
        renderCell: ({ row }) => {
          if (adding ? row.id === 'addRow' : '') {
          }
  
        }

       
      },

  

      {
    
        field: 'name',
        headerName: 'User',
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
    
        field: 'catId.name',
        headerName: 'LISTING NAME',
        flex: 1,
        renderCell: ({ row }) => {
          if (adding ? row.id === 'addRow' : '') {
            return <CustomCategoryCell depData={depData} setDepData={setDepData} handleInputChange={handleInputChange} />;
          }

          if (row._id === rowToEdit) {
            return  <CustomerCategoryInputEdit cateName={cateName} setCateName={setCateName}  />;
              }
              return row.catId.name; 
              // const category = catId.find(cat => cat.id === row.catId);
              // return category ? category.name : ''; 
  
        }
      },

      
 

      {
       
        field: 'icon',
        headerName: 'RATING',
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
        // editable: true,
        field: 'description',
        headerName: 'Comment',
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
        
        field: 'status',
        headerName: 'SHOW/HIDE',
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
            align: 'center',
            headerName: 'Actions',
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
