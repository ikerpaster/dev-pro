import React from 'react';
import Role from './permissionForm';
import { XMarkIcon } from '@heroicons/react/24/solid';
 
 
const RolePOPUP = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-red-500x py-10 z-50 ">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          
          {/* Make this full screen width */}
          <div className=" flex-col bg-white rounded-lg   z-50  w-3/5 h-full overflow-y-hidden">
          
       

            <div className='w-full flex  justify-between py-4'>
                <div className='text-lg font-bold flex justify-between w-full px-3'>
                  <span className='text-[2rem] px-3 py-2'> Add New Role </span>
                  <span onClick={onClose} className='bg-red-500x relative rounded-md text-sm text-red-700 cursor-pointer'>  <XMarkIcon className='h-6 w-6 ' /> </span>

                </div>

              </div>
              <hr />


        <div className='  px-5 w-full h-[90%]  py-14 bg-violet-50 pb-10 menu'>

        
          
        <Role />
          {/* <AddRoleForm /> */}

 
          </div>
          {/* <div className=" mt-6 w-full h-10 flex justify-end bg-yellow-300"> eee</div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default RolePOPUP;



 
