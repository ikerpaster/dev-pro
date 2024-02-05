import React, { useEffect, useState } from 'react';
import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Add, BorderColorOutlined, ChevronLeftOutlined, ChevronRightOutlined, CleaningServicesOutlined, Close, DeleteOutlineOutlined, InsertEmoticonOutlined, MoreHorizOutlined, Rotate90DegreesCcwOutlined, SendOutlined, TransformOutlined } from '@mui/icons-material';
import Image from 'next/image';

const UploadFiles = ({setFormData,formData,setChatBoardReceivedFile,store, dispatch, sendMsg}) => {

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




console.log("STOREEE STOREEE:: ", store);


const handleSend = async () => {
  // Check if there are uploaded files
  if (formData.documentIDsE.length === 0) {
    alert("Please upload files before sending.");
    return;
  }

  // Prepare data to be sent to the database
  const dataToSend = {
    images: formData.documentIDsE.map((file, index) => ({
      url: URL.createObjectURL(file),
      caption: caption || `Caption ${index + 1}`,
    })),
    // Add any other relevant data you want to send to the database
  };

  try {
    // Dispatch an action to send data to the Redux store
    // dispatch(sendFilesToDatabase(dataToSend));
    const type = "file";
    const url = [{url:"http://localhost:3000/images/chats/m3.jpeg",caption:"this is the firstos caps men "}]; 
    const msg = "this is my my Love1";

    dispatch(sendMsg({ ...store.selectedChat, type: type,fileMessage:url, message:msg }));

    // Optionally, reset the form or perform other actions after successful upload
    setFormData({
      documentIDsE: [], // Clear the uploaded files
    });
    setCaption('');
    setChatBoardReceivedFile(false); // Close the file upload component
  } catch (error) {
    console.error("Error sending data to the database:", error);
    // Handle errors, show a message, or take appropriate action
  }
};


  

  const handleAddMoreFiles = () => {
    const input = document.getElementById('documentIDsE');
    if (input) {
      input.click(); // Trigger the file selection process
    }
  };

  const handleScreenClick = () => {
    alert('Screen Clicked!');
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

 
  const [rotation, setRotation] = useState(0);

  const rotateImage = () => {
    const newRotation = (rotation + 90) % 360;
    setRotation(newRotation);
  };

  return (
    <div className='w-full bg-red-500x absolutex menuxs py-4 mt-10  items-center justify-center flex-col p-10 menuxs '>
<div className='h-[calc(100vh - 10rem)]x h-[500px]x max-h-[700px]  w-[40%] bg-red-500x p-5 menus shadow-2xl rounded-lg bg-red-200x bg-white absolute bottom-0'>


<div className='menux w-full max-h-screen relative bg-green-400x flex flex-col'>

      <div className='w-full bg-gray-100 h-full  flex justify-center items-center  menu  '>
      <div
          className="hidden w-full bg-white p-8 rounded-lg shadow-md border border-dashed border-gray-400"
        
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

{/* <div className='w-full h-[400px] absolutex top-0 bg-orange-300'> */}
<Image alt='image'
        src={selectedImage}
        height={1000}
        width={1000}
        className={`w-full max-h-[550px] object-contain top-0 mb-24`}
        style={{ transform: `rotate(${rotation}deg)` }}
      />
{/* </div> */}
        
      </div>
 
<div className='bg-red-500x bg-white h-12x  w-full absolute bottom-0 '>
  <div className='h-12 bg-gray-100 flex items-center py-2 gap-1 px-2 '>
    <InsertEmoticonOutlined />
  <input type="text"
        placeholder="Enter caption"
        value={caption}
        onChange={handleCaptionChange}
        className=" border rounded flex flex-grow h-full p-2 bg-gray-100 outline-none text-sm text-gray-400"
      />
  </div>

<div className='bg-green-500x w-full h-fit flex justify-between '>
  <div className='flex gap-1 bg-blue-600x w-[85%] overflow-hidden relative'>
  {formData.documentIDsE.map((document, index) => (
          <div key={index} className="border border-gray-100 " onClick={()=>{handleImageDisplay(URL.createObjectURL(document));setCurrentIndex(index)}}>
         
              <div className="h-16 w-16 bg-blue-400 rounded-md overflow-hidden relative">
               
                  <img
                    src={URL.createObjectURL(document)}
                    alt={`Uploaded Document ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
              </div>
    
   


          
          </div>
        ))}
 

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

  <div className='flex items-center mx-2 gap-2'>
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
</div>


</div>


</div>
{/*
<button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleSend}
      >
        submit to db 
      </button> 

      <div className='' onClick={()=>setChatBoardReceivedFile(false)}>CLose </div> */}

      </div>


      <div className='w-full bg-gray-50  absolute top-0 left-0 py-1 px-2'>

<div className='w-full flex justify-between itemes-center'>
  <div className='mx-2 gap-3 flex '>
   <span className='cursor-pointer hover:bg-violet-500 transition transform ease-in-out duration-500 rounded-2xl hover:text-white p-2'><BorderColorOutlined /></span>
   <span className='cursor-pointer hover:bg-violet-500 transition transform ease-in-out duration-500 rounded-2xl hover:text-white p-2'> <CleaningServicesOutlined /> </span>
  <span onClick={()=>rotateImage(currentIndex)} className='cursor-pointer hover:bg-violet-500 transition transform ease-in-out duration-500 rounded-2xl hover:text-white p-2'><Rotate90DegreesCcwOutlined /></span>
  <span className='cursor-pointer hover:bg-violet-500 transition transform ease-in-out duration-500 rounded-2xl hover:text-white p-2'><TransformOutlined /></span>
  <span onClick={()=>handleRemoveDocument(currentIndex)} className='cursor-pointer hover:bg-violet-500 transition transform ease-in-out duration-500 rounded-2xl hover:text-white p-2' ><DeleteOutlineOutlined /> </span>
  </div>
  <span onClick={()=>setChatBoardReceivedFile(false)} className='cursor-pointer hover:bg-violet-500 transition transform ease-in-out duration-500 rounded-2xl hover:text-white p-2'>
    <Close />
  </span>
</div>

      </div>
</div>
    </div>
  );
}

export default UploadFiles;

    
    
    
    
 