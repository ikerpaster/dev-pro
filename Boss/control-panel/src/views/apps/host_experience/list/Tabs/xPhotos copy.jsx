import React, { useEffect, useState } from 'react';
import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Add, BorderColorOutlined, ChevronLeftOutlined, ChevronRightOutlined, CleaningServicesOutlined, Close, DeleteOutlineOutlined, InsertEmoticonOutlined, MoreHorizOutlined, Rotate90DegreesCcwOutlined, SendOutlined, TransformOutlined } from '@mui/icons-material';
import Image from 'next/image';

const Photos = ({setFormData,formData}) => {

  const [caption, setCaption] = useState('');
  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleRemoveDocument = (index) => {
    const updatedDocuments = formData.documentIDsE.filter((_, i) => i !== index);
    setFormData({ ...formData, documentIDsE: updatedDocuments });
  };

  const handleFileChange = (event, type) => {
    const files = event.target.files;

    if (type === 'documentIDsE') {
      setFormData({ ...formData, documentIDsE: [...formData.documentIDsE, ...files] });
    }
  };







const handleSend = async () => {
  // Check if there are uploaded files
  if (formData.documentIDsE.length === 0) {
    alert("Please upload files before sending.");
    return;
  }



};


  

  const handleAddMoreFiles = () => {
    const input = document.getElementById('documentIDsE');
    if (input) {
      input.click(); // Trigger the file selection process
    }
  };

  const [currentIndex, setCurrentIndex] = useState();
  const [selectedImage, setSelectedImage] = useState('');
  const [totalImg,setToatalImg] = useState(0);
  

  useEffect(() => {
    // Set the selectedImage to the URL of the first image when the component mounts
    if (formData.documentIDsE.length > 0) {
      setSelectedImage(URL.createObjectURL(formData.documentIDsE[0]));
      setToatalImg(formData.documentIDsE.length);
    }
  }, [formData.documentIDsE]);

  const handleImageDisplay = (imageUrl) => {
    // Your image display logic here
    setSelectedImage(imageUrl);
  };

  const handleNext = () => {
    const nextIndex = Math.min(currentIndex + 1, formData.documentIDsE.length - 1);
    setCurrentIndex(nextIndex);
    setSelectedImage(URL.createObjectURL(formData.documentIDsE[nextIndex]));
  };

  const handlePrev = () => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(prevIndex);
    setSelectedImage(URL.createObjectURL(formData.documentIDsE[prevIndex]));
  };

 
  const handleFileDrop = (event, type) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
  
    if (type === 'documentIDsE') {
      setFormData({ ...formData, documentIDsE: [...formData.documentIDsE, ...files] });
    }
  };


  return (
   
   <div className=''>
<div className=' w-full h-[calc(100vh-50rem)]bg-violet-800 p-8 rounded-lg shadow-md border border-dashed border-gray-400 menus '
  // className="relativex"
  onDragOver={handleFileDrop}
//   onDragLeave={handleDragLeave}
  onDrop={(e) => handleFileDrop(e, 'documentIDsE')}
  >

      <div
          className=" w-full "
        
        >
 
          <label htmlFor="documentIDsE" className="block text-gray-700 font-medium text-lg mb-4 text-center">
            Upload  ( Images , Videos or PDF ) Files
          </label>
          <div className="flex justify-center items-center">
            <input
              type="file"
              id="documentIDsE"
              name="documentIDsE"
              accept="image/*, application/pdf"
              multiple
              onChange={(event) => handleFileChange(event, 'documentIDsE')}
              className="hidden"
            />
        
          </div>
        </div> 


      
 
 

 
  <div className='flex gap-1 bg-blue-600x w-[85%] overflow-hidden relative'>
 
 

{formData.documentIDsE.length > 6 && (
        <>
          {currentIndex > 0 && (
            <div className='absolute left-0 z-50  p-1  flex justify-center  items-center h-full' onClick={handlePrev}>
              <span className='bg-violet-900 text-white bg-opacity-50 hover:bg-white hover:text-violet-700 cursor-pointer'>
                <ChevronLeftOutlined className='h-2 w-2'/>
              </span>
            </div>
          )}

          {currentIndex + 6 < formData.documentIDsE.length && (
            <div className='absolute right-0 z-50  p-1  flex justify-center  items-center h-full' onClick={handleNext}>
              <span className='bg-violet-900 text-white bg-opacity-50 hover:bg-white hover:text-violet-700 cursor-pointer'>
                <ChevronRightOutlined className='h-2 w-2'/>
              </span>
            </div>
          )}
        </>
      )}
      

         
  </div>


{/* add and submit buttons  */}
  {/* <div className='flex items-center mx-2 gap-2'>
<div
        className=" bg-violet-900 py-2 px-2 text-xl text-white rounded-lg text-center shadow-2xl hover:bg-violet-500 transition transform ease-in-out duration-500 cursor-pointer"
        onClick={handleAddMoreFiles}
      >
       <Add />
      </div>
      <div onClick={handleSend} className='bg-violet-900 py-2 px-2 text-xl text-white rounded-lg text-center shadow-2xl hover:bg-violet-500 transition transform ease-in-out duration-500 cursor-pointer'>
        <SendOutlined />
        <div className=' bg-violet-400x absolute text-[10px] font-semibold shadow-xl shadow-black bottom-0 right-1 rounded-full bg-white text-violet-800 w-4 h-4 flex items-center justify-center'>
          <span className=''>{totalImg} </span></div>
      </div>
</div> */}

 
 

       


</div>



{/* lists  */}

<div className='grid grid-cols-4 gap-2 mt-2 max-h-[calc(100vh-30rem)] bg-green-500x menu '>
{formData.documentIDsE.map((document, index) => (
          <div key={index} className="border border-gray-100 " onClick={()=>{handleImageDisplay(URL.createObjectURL(document));setCurrentIndex(index)}}>
         
              <div className="h-full w-full bg-blue-400 rounded-md overflow-hidden relative">
               
                  <img
                    src={URL.createObjectURL(document)}
                    alt={`Uploaded Document ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
              </div>
    
   


          
          </div>
        ))}
</div>


   </div>

   
  );
}

export default Photos;

    
    
    
    
 