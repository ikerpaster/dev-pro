'use client'
import React, { useState } from 'react';

const USER_ROLE = ({  selectedUserType, setSelectedUserType,continueB, setContinueB }) => {

  // const [selectedUserType, setSelectedUserType] = useState(null);
  // const [continueB, setContinueB] = useState(false);

  const handleUserTypeSelection = (userType) => {
    setSelectedUserType(userType);

  };

  const handleContinue = () => {
    setContinueB(true);
    if (selectedUserType === 'isAdmin') {

    } else if (selectedUserType === 'isAgent') {

    } else if (selectedUserType === 'isClient') {

    }
  };
  
 
  return (
    <>
 
          {/* Make this full screen width */}
          <div className="bg-white w-full bg-opacity-120 px-3 rounded-lg z-10  h-[calc(100vh-20rem)]  overflow-y-hidden">
            <div className='w-full flex justify-end -mt-6  items-center'>  </div>

            <div className='px-2 w-full h-full py-14 '>

              <hr />

{!continueB && (


              <div className="w-full h-[calc(100vh-20rem)] bg-yellow-800x relative">
                <div className="w-full px-20 mt-20">
                  <div className="text-[2rem] font-bold">Select User Type</div>
                  <span className="text-gray-400 text-md">Choose User Category</span>
                </div>

                <div className="w-full grid grid-cols-3 gap-5 items-center px-20 mt-20 text-xs">
                  <div
                    onClick={() => handleUserTypeSelection('isAdmin')}
                    className={`bg-white SelectUserCard ${selectedUserType === 'isAdmin' ? 'selected' : ''
                      }`}
                  >
                    <span className="titleDUser ">Admin</span>
                    <span className="subDUser">Employees / staff</span>
                  </div>

                  <div
                    onClick={() => handleUserTypeSelection('isHost')}
                    className={`SelectUserCard ${selectedUserType === 'isHost' ? 'selected' : ''
                      }`}
                  >
                    <span className="titleDUser">Host</span>
                    <span className="subDUser">Property Owners / Managers</span>
                  </div>

                  <div
                    onClick={() => handleUserTypeSelection('isClient')}
                    className={`SelectUserCard ${selectedUserType === 'isClient' ? 'selected' : ''
                      }`}
                  >
                    <span className="titleDUser">Customer</span>
                    <span className="subDUser">Passengers / Travel Agents</span>
                  </div>
                </div>
                {/* xlg:h-[400px] lg:h-[220px] */}

                <div className="my-20 float-right mr-20 ">
                  <div
                    onClick={handleContinue}
                    className={`w-fit bg-[#7239ea] py-4 px-5 md:text-md font-bold text-white  rounded-lg ${selectedUserType ? 'cursor-pointer' : 'opacity-50 pointer-events-none'
                      }`}
                  >
                    <span>Continue</span>
                    <span>
                      {/* <ChevronRight className="" /> */}
                    </span>
                  </div>

               
                </div>

             
              </div>
)}

{/* {continueB && (<USER_INFO userCategory={selectedUserType} isAdmin={selectedUserType==='admin'} isCustomer={selectedUserType==='customer'} isHost={selectedUserType==='host'} /> )}
               
           */}


              <div className="mt-6 flex justify-end">

              </div>
            </div>
          </div>
   
    </>
  );
};

export default USER_ROLE  
 
