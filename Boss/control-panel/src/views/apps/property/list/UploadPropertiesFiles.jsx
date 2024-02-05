 'use client'
import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';

 
const UploadFilePropertyList = ({proInfo,setProInfo,locationInfo,setLocationInfo}) => {
  // ** State
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    const draggedOverIndex = index;

    if (draggedOverIndex !== draggedIndex) {
      const updatedDocuments = Array.from(proInfo.proImages);
      const draggedDocument = updatedDocuments[draggedIndex];
      updatedDocuments.splice(draggedIndex, 1);
      updatedDocuments.splice(draggedOverIndex, 0, draggedDocument);

      setProInfo({ ...proInfo, proImages: updatedDocuments });
      setDraggedIndex(draggedOverIndex);
    }
  };

  const handleFileChange = (event, type) => {
    const files = event.target.files;
    const updatedDocuments = [...proInfo[type]]; // Access the correct type
  
    const maxSizeForPhotos = 500 * 1024; // 50KB for photos
    const maxSizeForVideos = 3000 * 1024; // 300KB for videos
  
    if (type === 'proImages') {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileSizeInBytes = file.size;
  
        if (fileSizeInBytes <= maxSizeForPhotos) {
          updatedDocuments.push(file);
        } else {
          // Handle error or show message specific to photo size limit exceeded
          console.error(`Image size exceeded the maximum limit (${maxSizeForPhotos} bytes).`);
          handleClick();
          alert("Image size exceeded the maximum limit")
        }
      }
    }
    setProInfo({ ...proInfo, [type]: updatedDocuments });
  };
  
  
  const handleRemovePHOTO_DOC = (index) => {  
  
    const updatedDocuments = proInfo.proImages.filter((_, i) => i !== index);
    setProInfo({ ...proInfo, proImages: updatedDocuments });
  
  };

  const handleFileDrop = (event, type) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
  
    if (type === 'proImages') {
      setProInfo({ ...proInfo, proImages: [...proInfo.proImages, ...files] });
    }
  
   
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDraggedIndex(null);
  };


  
  return (
    <div className='bg-white p-4'>
    {/* <ToastContainer  position="top-center" className="z-50 absolute" /> */}
    <h2 className="text-lg font-bold mb-4">Property Images</h2>
   <div className='w-full bg-gray-100  flex justify-center items-center mb-8'>
         <div
           className="w-full bg-white p-8 rounded-lg shadow-md border border-dashed border-gray-400"
           onDragOver={(e) => e.preventDefault()}
           onDrop={(e) => handleFileDrop(e, 'proImages')}
         >
     
           <div className="flex justify-center items-center">
             <input
               type="file"
               id="proImages"
               name="proImages"
               accept="image/*"
               multiple
               onChange={(event) => handleFileChange(event, 'proImages')}
               className="hidden"
             />
             <label
               htmlFor="proImages"
               className="cursor-pointer py-2 px-8 text-gray-500 transition duration-300 ease-in-out"
             >
               <ArrowUpTrayIcon className='h-5 w-12 mx-auto mb-2 text-gray-400' />
               <p className="text-center">Drag and drop or click to upload (Max file size: 50KB)</p>
             </label>
           </div>
         </div>
       </div>

   <div className='mt-2 grid grid-cols-3 gap-4'>
     {proInfo.proImages.map((document, index) => (
       <div
         key={index}
         className="relative overflow-hidden"
         draggable
         onDragStart={() => handleDragStart(index)}
         onDragOver={(e) => handleDragOver(e, index)}
         onDrop={handleDrop}
       >
         {document.type.includes('image') ? (
           <img
             src={URL.createObjectURL(document)}
             alt={`Uploaded Document ${index + 1}`}
             className="w-full h-40 object-cover rounded-lg"
           />
         ) : (
           <div className="h-full w-full flex items-center justify-center text-gray-500 font-semibold">
             PDF
           </div>
         )}

         <button
           type="button"
           className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
           onClick={() => handleRemovePHOTO_DOC(index)}
         >
           <TrashIcon className='w-5 h-5 ' />
         </button>

         {index === 0 ? (
           <div className='w-full bg-black p-2 absolute bottom-0 text-white text-center bg-opacity-50 rounded-bl-lg rounded-br-lg'>Cover Image</div>
         ) : (
           ''
         )}
       </div>
     ))}
   </div>
 </div>
  )
}

export default UploadFilePropertyList
