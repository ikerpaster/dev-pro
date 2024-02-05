import React, { useContext } from 'react';
import { CurrentUserContext } from 'src/@core/context/CurrentUserContext';

const Index = () => {
  const { currentUser, logout } = useContext(CurrentUserContext);
 
  return (
    <div>
      This is the dashboard page coming soon...
      {currentUser?._id}
      
      <button onClick={logout} className='py-3 bg-amber-600 my-5 rounded-lg text-white font-bold text-lg'>
        Logout
      </button>
    </div>
  );
};

export default Index;
