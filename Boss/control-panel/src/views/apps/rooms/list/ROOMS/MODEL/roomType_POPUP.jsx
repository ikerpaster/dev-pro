import React from 'react';
 
 
import AddnewRoomType from '../ELE/addRoomType';
// import AddRole from './elements/addRole';

const RoomTypePOPUP = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-red-500x py-5">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          
          {/* Make this full screen width */}
          <div className="bg-white rounded-lg p-8  z-10   h-full overflow-hidden pb-10">
          <div className='w-full flex justify-end -mt-6  items-center'>
        <div onClick={onClose} className='bg-red-400x flex justify-end items-start cursor-pointer'>
                       <span className='h-5 w-5 bg-red-500 flex items-center justify-center text-center text-lg rounded-lg text-white'> &times; </span>
                        </div>
  
          
            
                       
          </div> 
          <h2 className="text-2xl font-semibold mb-4 shadow-md py-2 px-5 shadow-gray-100 text-gray-400">Add New Room Type</h2>
        <div className='px-20 w-full h-full menu'>

       
       
          
        
          
          <AddnewRoomType />

     




            <div className="mt-6 flex justify-end">
             
            </div>
          </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomTypePOPUP;
