import React from 'react';

const LoadingModal = ({ show }) => {
  if (!show) {
    return null; // Render nothing if show is false
  }

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
        <div className="relative bg-white rounded-lg w-64 p-4">
          <div className="flex items-center justify-center mb-4">
            <svg className="animate-spin h-8 w-8 mr-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.268 0-4.319-.962-5.793-2.51l1.793-1.792zM20 12a8 8 0 01-8 8v4c4.418 0 8-3.582 8-8h-4zm-2-5.291A7.96 7.96 0 0120 12h4c0-4.418-3.582-8-8-8v4c2.268 0 4.319.962 5.793 2.51l-1.793 1.792z"></path>
            </svg>
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
