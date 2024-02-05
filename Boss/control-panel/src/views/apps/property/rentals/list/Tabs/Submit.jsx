'use client';
// import newRequest from '@/utils/newRequest';
// import upload from '@/utils/upload';
import React, { useEffect, useState } from 'react';
 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import upload from 'src/@core/utils/upload';
import LoadingModal from './ele/LoadingModal';


const Submit = (
  {
    rentInfo,saleInfo,
    basicInfo,
    locationInfo,
    mediaData,
    amenitiesInfo,
    selectedPurpose, selectedFurnishing ,selectedType ,selectedCategory
  }) => {

 
// Function to transform frontend amenities to match backend schema structure
const transformAmenitiesForBackend = (amenitiesInfo) => {
  const formattedAmenities = {
    amenities: {}
  };

  // Loop through the frontend amenities and transform them
  for (const key of Object.keys(amenitiesInfo)) {
    formattedAmenities.amenities[key] = amenitiesInfo[key];
  }

  return formattedAmenities;
};

// Transform frontend amenities for backend before sending data to the server
const transformedAmenities = transformAmenitiesForBackend(amenitiesInfo);

// Now `transformedAmenities` has the structure expected by the backend schema
console.log(transformedAmenities);
 
 
const [loadingText, setLoadingText] = useState('');
const [mediaLoading, setMediaLoading] = useState(false);

  const handleSubmit = async () => {
 
    try {
      // Set loading state to true while uploading media
      setMediaLoading(true);
  
      const uploaded_PHOTO_DOC = [];
      const uploaded_VIDEO_DOC = [];
  
      // Upload videos if VIDEO_DOC is present in mediaData
      if (mediaData.VIDEO_DOC.length > 0) {
        for (const selectedFileLegalDoc of mediaData.VIDEO_DOC) {
          const url = await upload(selectedFileLegalDoc);
          uploaded_VIDEO_DOC.push(url);
        }
      }
  
      // Upload photos if PHOTO_DOC is present in mediaData
      if (mediaData.PHOTO_DOC.length > 0) {
        for (const selectedFileLegalDoc of mediaData.PHOTO_DOC) {
          const url = await upload(selectedFileLegalDoc);
          uploaded_PHOTO_DOC.push(url);
        }
      }
 
      const data = {
        ProPurpose:selectedPurpose,
        ProFurninshing:selectedFurnishing,
        ProType:selectedType,
        ProCategory:selectedCategory,
        basicInfo,
        rentInfo,
        saleInfo,
    locationInfo,
    mediaData: {
      VIDEO_DOC: uploaded_VIDEO_DOC,
      PHOTO_DOC: uploaded_PHOTO_DOC,
      videoUrl: mediaData.videoUrl,
    },
    amenitiesInfo: transformedAmenities,
 
      };
 

      console.log("All Datas", data);
      // Send data to backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/admin/rentals/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'An error occurred');
      }
  
      const responseData = await res.json();
      const successMessage = responseData.message || 'Property successful';
  
      // Access the response message and show success toast
      toast.success(successMessage);
    } catch (error) {
      console.error('Error sending data to backend:', error);
      toast.error(error.message || 'An error occurred');
    } finally {
      // Set loading state to false after uploading and API request completion
      setMediaLoading(false);
    }
  };
  

  // function extractVideoId(url) {
  //   const videoIdRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
  //   const match = url.match(videoIdRegex);
  //   return match ? match[1] : '';
  // }
  // Helper function to extract the video ID from a YouTube URL
  function extractVideoId(url) {
    const videoIdRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : '';
  }

  const isValidYouTubeUrl = (url) => {
    // Regular expression pattern to match a valid YouTube video URL
    const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
  };

  

  return (
    <div className='bg-white'>

{/* loadinf modal  */}
<div className='bg-white'>
    {/* ... (other components) */}
    <LoadingModal show={mediaLoading} />
    {/* ... (other components) */}
  </div>
      {/* ENDING OF THE IMAGES  */}
      <div className='h-'> p</div>
      <h2 className="text-lg font-bold mb-2">FINAL Step: Review Your Data</h2>
      <div>
      <div className="">
          <div className="w-full text-2xl">BASIC INFO </div>
          <p>Purpose:: {selectedPurpose}</p>
          <p>Fursnished:: {selectedFurnishing}</p>
          <p>Categry :: {selectedCategory}</p>
          <p>Type:: {selectedType}</p>
          

          <p>Lising Namer: {basicInfo?.listingName}</p>
          <p>Builing Info: {basicInfo?.buildingNo}</p>
         
          <p>Property Florr Number: {basicInfo?.propertyFloorNo}</p>
          <p>Unit Number: {basicInfo?.unitNo}</p>
           
   <p> Description: {basicInfo?.description}</p>

   <p> Permit No: {basicInfo?.permitNo}</p>

   <p> BedRooms: {basicInfo?.bedrooms}</p>

   <p>Bath Rooms: {basicInfo?.bathrooms}</p>

   <p>Room Types: {basicInfo?.roomType}</p>
   <p>Ownership: {basicInfo?.ownshipStatus}</p>
   <p>Listing Owner: {basicInfo?.listingOwner}</p>
   <p>Completions Status: {basicInfo?.completionStatus}</p>
   <p>Price: {basicInfo?.price}</p>
   <p>Ocupations: {basicInfo?.ocupationStatus}</p>
  
        </div>


        <div className="">
          <div className="w-full text-2xl">RENTAL INFO </div>
 

          <p>Rental Freequency: {rentInfo?.rentalFrequency}</p>
          <p>Contract Period: {rentInfo?.contractPeriod}</p>
         
          <p>Vocating Notice Period: {rentInfo?.vocatingNoticePeriod}</p>
          <p>Maintenance Fee: {rentInfo?.maintenanceFee}</p>
           
   <p>Paid By: {rentInfo?.paidBy}</p>

  
  
        </div>


        <div className="">
          <div className="w-full text-2xl">SALES INFO </div>
 
          <p>Financing Available: {saleInfo?.financingAvailable}</p>
          <p>Finacning Instutions Name: {saleInfo?.financingInstitutionName}</p>
  
        </div>

 

    <div>
      <div className="w-full text-2xl">AMENITIES INFO</div>
      <ul>
          {Object.entries(amenitiesInfo).map(([category, checkedItems]) => (
            <li key={category}>
              <h3 className='bg-red-400'>{category}</h3>
              <ul>
                {checkedItems.map((itemName) => (
                  <li key={itemName}>{itemName}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
    </div>
 


    <div className='grid grid-cols-2 gap-2 h-fit'>
  {mediaData.videoUrl.map((videoUrl, index) => (
    (videoUrl && videoUrl.trim() !== '' && isValidYouTubeUrl(videoUrl)) && (
      <div key={index} className="aspect-w-16 aspect-h-9 h-full rounded-lg overflow-hidden mb-4">
        <iframe
          title={`YouTube Video ${index}`}
          src={`https://www.youtube.com/embed/${extractVideoId(videoUrl)}`}
          frameBorder="0"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    )
  ))}
</div>

 


        <div className='mt-2 grid grid-cols-2 gap-4'>
        {mediaData?.VIDEO_DOC.map((document, index) => (
          <div
            key={index}
            className="relative overflow-hidden"
          >
             {document.type.startsWith('video/') ? (
              <video
                src={URL.createObjectURL(document)}
                alt={`Uploaded Document ${index + 1}`}
                className="w-full h-40 rounded-lg"
                controls
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray-500 font-semibold">
                Not a video file
              </div>
            )}
 

            {index === 0 ? (
              <div className='w-full bg-black p-2 absolute bottom-0 text-white text-center bg-opacity-50 rounded-bl-lg rounded-br-lg'>Cover Video</div>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>




        <div className='my-10 grid grid-cols-3 gap-4 px-4'>
        {mediaData.PHOTO_DOC.map((document, index) => (
          <div
            key={index}
            className="relativex overflow-hidden"
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

            

            {index === 0 ? (
              <div className='w-full bg-black p-2 absolute bottom-0 text-white text-center bg-opacity-50 rounded-bl-lg rounded-br-lg'>Cover Image</div>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>

 

        <button onClick={handleSubmit} className='py-10 bg-blue-700 rounded-md text-lg'>
          Submit Now!!
        </button>

      </div>
    </div>
  );
};

export default Submit;
