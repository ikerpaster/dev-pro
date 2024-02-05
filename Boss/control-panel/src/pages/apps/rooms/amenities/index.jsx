// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'
import useSWR from 'swr'
import CustomNameCell from 'src/views/apps/user/department/Cells/NameInput'
import CustomerIconInput from 'src/views/apps/user/department/Cells/IconInput'
import CustomerDescrInput from 'src/views/apps/user/department/Cells/descriptionInput'
import CustomNameCellEdit from 'src/views/apps/user/department/EditRow/NameInput'
import CustomerIconInputEdit from 'src/views/apps/user/department/EditRow/IconInput'
import CustomerDescrInputEdit from 'src/views/apps/user/department/EditRow/descriptionInput'
import CustomCategoryCell from 'src/views/apps/user/department/Cells/CategoryInput'
import DialogDeleteAmenity from 'src/views/apps/rooms/amenities/ele/DialogDeleteAmenity'
import CustomerCategoryInputEdit from 'src/views/apps/user/department/EditRow/categoryInput'
import TableHeaderAMENITIES from 'src/views/apps/rooms/amenities/TableHeaderAMENITIES'
import QuickSearchToolbarr from 'src/views/apps/user/list/ele/QuickSearchToolbar'


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
 
 
const CustomSaveButtonCell = () => {
 
    const handleSubmit = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/admin/amenities`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cateId:depData.catName,
            icon:depData.IconDep,
            name:depData.name,
            description:depData.description,
            status:true,
          }),
        });
    
        if (res.ok) {
          alert('Amenity  added successfully!'); 
          toast.success("Amenity added successfully!");// Show success alert
          setAdding((prev)=>!prev);
        } else {
          // alert('Failed to add position'); // Show error alert
          toast.error('Failed to add Amenity');
        }
      } catch (error) {
        console.error('Error sending data to backend:', error);
        toast.error('An error occurred while sending data to the server'); // Show error alert
      }
    };

  return (
    <button onClick={handleSubmit} className='bg-blue-500 text-white px-3 py-1 rounded'>
      Save
    </button>
  );
};
// END CUSTOMER INPUTS 


const HandleUpdateBTN = ({id}) => {
  // setShowAndHideUpdateBTN(true);
  const handleSubmit = async () => {

    console.log("this is EDIT DATA Description:: ",description);
    console.log("ICON URL:: ", iconUrl);
    console.log("DepNAme:: ",depName);
    console.log("ID:",id);
    console.log("cateName:: ",cateName);
    const ida = 6123;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/admin/amenities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category:cateName,
          icon:depName,
          name:iconUrl,
          description:description,
          status:true,
          
        }),
      });
  
      if (res.ok) {
        alert('Amenity  Updated successfully!'); 
        // setEditButtonClicked(false);
        // setRowToEdit(ida);
        setRowToEdit(false);
        // setShowAndHideUpdateBTN(false);
        toast.success("Updated successfully!");// Show success alert
        // setAdding((prev)=>!prev);
      } else {
        // alert('Failed to add position'); // Show error alert
        toast.error('Failed to update Amenity ');
      }
    } catch (error) {
      console.error('Error sending data to backend:', error);
      toast.error('An error occurred while sending data to the server'); // Show error alert
    }
  };

  return (
    <button onClick={handleSubmit} className='bg-blue-500 text-white px-3 py-1 rounded'>
      Update1
    </button>
  );
};
{/* <button onClick={handleUpdate}>Update</button> */}
 

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
        
 
 


    <TableHeaderAMENITIES
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
    
        field: 'catId.name',
        headerName: 'Category',
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
        // editable: true,
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
        
        field: 'status',
        headerName: 'Status',
        flex: 1,
        renderCell: ({ row }) => {
          if (adding ? row.id === 'addRow' : '') {
          }
  
        }

       
      },
      

      {
        flex: 0.5,
        minWidth: 90,
        sortable: false,
        field: 'actions',
        headerName: 'Actions',
        renderCell: ({ row }) => {
              if (adding ? row.id === 'addRow' : '') {
                return <CustomSaveButtonCell />;
              }

              

              if (row._id === rowToEdit) {
           
               return <HandleUpdateBTN id={row._id} />
                  }

             

              return (
                <div className='flex gap-3 '>
                 {/* <div className='text-blue-700 font-semibold p-1 text-xs rounded-full hover:bg-blue-500 hover:text-white transition transform ease-in-out duration-500 cursor-pointer'>  <ViewDepartment id={row?._id} depDesc={row.depDesc} depName={row.depName} /></div> */}
                <div
                onClick={() => HandleUpdates(row._id)}
                className='text-green-700 font-semibold p-1 text-xs rounded-full hover:bg-green-500 hover:text-white transition transform ease-in-out duration-500 cursor-pointer'
              >
                <Icon icon='mdi:pencil-outline' fontSize={20} />
           </div> 
                  {/* <div className='text-red-700 font-semibold p-1 text-xs rounded-full hover:bg-red-500 hover:text-white transition transform ease-in-out duration-500 cursor-pointer'>   */}
                  <div className='text-red-700 font-semibold p-1 text-xs rounded-full hover:bg-red-500 hover:text-white transition transform ease-in-out duration-500 cursor-pointer'>   <DialogDeleteAmenity id={row?._id} /></div>
                </div>
              );

          },

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
