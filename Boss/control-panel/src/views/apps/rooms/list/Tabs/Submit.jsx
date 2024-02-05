'use client';
// import newRequest from '@/utils/newRequest';
// import upload from '@/utils/upload';
import React, { useEffect, useState } from 'react';
 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import upload from 'src/@core/utils/upload';
import LoadingModal from './ele/LoadingModal';
import moment from 'moment';


const Submit = (
  {
    basicInfo,
    locationInfo,
    pricingInfo,
    pricingRulesInfo,
    availableRules,
    checkInProcedure,
    mediaData,
    amenitiesInfo,

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
        basicInfo,
    locationInfo,
    pricingInfo,
    pricingRulesInfo,
    availableRules,
    checkInProcedure,
    mediaData: {
      VIDEO_DOC: uploaded_VIDEO_DOC,
      PHOTO_DOC: uploaded_PHOTO_DOC,
      videoUrl: mediaData.videoUrl,
    },
    amenitiesInfo: transformedAmenities,
 
      };
 

      console.log("ROOM DONNEEE:: ",data);

      // Send data to backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/admin/rooms/new`, {
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
      const successMessage = responseData.message || 'Room successful';
  
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
        
          <p>Bedrooms: {basicInfo?.bedrooms}</p>
          <p>Bathrooms: {basicInfo?.bathrooms}</p>
          <p>Private Bathroom: {basicInfo?.privateBathroom ? 'Yes' : 'No'}</p>
          <p>Room Type: {basicInfo?.roomType}</p>
          <p>Accommodates: {basicInfo?.accommodates}</p>
          {/* Display all the bed types and quantities */}
         Bed(s): {basicInfo.bed.map((bed, index) => (
            <p key={index}>
              {bed.type}: {bed.quantity}
            </p>

          ))}
   <p>Listing Name: {basicInfo?.listingName}</p>
   <p> Room Category:: {basicInfo.RoomCategory} </p>
        </div>

        {/* <div className="">
          <div className="w-full text-2xl">DESCRIPTION INFO </div>
          <p>Language: {descriptionInfo?.language}</p>
          <p>Summary: {descriptionInfo?.summary}</p>
          <p>Space: {descriptionInfo?.space}</p>
          <p>Guest Access: {descriptionInfo?.guestAccess}</p>
          <p>Interaction with Guests: {descriptionInfo?.interactionWithGuests}</p>
          <p>Other Things to Note: {descriptionInfo?.otherThingsToNote}</p>
          <p>House Rules: {descriptionInfo?.houseRules}</p>
          <p>Overview: {descriptionInfo?.overview}</p>
          <p>Getting Around: {descriptionInfo?.gettingAround}</p>
        </div> */}

        <div className="">
          <div className="w-full text-2xl">LOCATION INFO </div>
          <p>Map Place: {locationInfo?.mapAddress?.place}</p>
          <p>Map Url: {locationInfo?.mapAddress?.mapUrl}</p>
          <p>City: {locationInfo?.city}</p>
          <p>Country: {locationInfo?.country}</p>
          <p>Address Line 1: {locationInfo?.addressLine1}</p>
          <p>Address Line 2: {locationInfo?.addressLine2}</p>
          <p>City/Town/District: {locationInfo?.cityTownDistrict}</p>
          <p>State/Province/County/Region: {locationInfo?.stateProvinceCountyRegion}</p>
          <p>ZIP/Postal Code: {locationInfo?.zipPostalCode}</p>
        </div>  

    {/* <div>
      <div className="w-full text-2xl">AMENITIES INFO</div> */}
      {/* <ul>
          {Object.entries(amenitiesInfo)?.map(([category, checkedItems]) => (
            <li key={category}>
              <h3 className='bg-red-400'>{category}</h3>
              <ul>
                {checkedItems?.map((itemName) => (
                  <li key={itemName}>{itemName}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul> */}
    {/* </div> */}
 


    <div className='grid grid-cols-2 gap-2 h-fit'>
  {mediaData?.videoUrl?.map((videoUrl, index) => (
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

        {/* <div>
          <h2 className="text-lg font-bold mb-4">Step 6: Video URL</h2>
          <div className="w-full gap-4">
            <div className='w-full h-[400px]'>
              {mediaData.videoUrl && (
                <div className="aspect-w-16 aspect-h-9 h-full rounded-lg overflow-hidden">
                  <iframe
                    title="YouTube Video"
                    src={`https://www.youtube.com/embed/${extractVideoId(mediaData.videoUrl)}`}
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div> */}


        <div className='mt-2 grid grid-cols-2 gap-4'>
        {mediaData?.VIDEO_DOC.map((document, index) => (
          <div
            key={index}
            className="relative overflow-hidden"
          >
             {document?.type.startsWith('video/') ? (
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
        {mediaData?.PHOTO_DOC?.map((document, index) => (
          <div
            key={index}
            className="relativex overflow-hidden"
          >
            {document?.type.includes('image') ? (
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


        <div>
          <h2 className="text-lg font-bold mb-4">Step 7: Pricing</h2>

          

           <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold "> Night Info </div>
          <div>{pricingInfo.nightPrice}</div>
        </div>

<hr />
     
  <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold "> Av Min Date </div>
          {/* <div>{moment(pricingInfo.availableMinDate.toString()).format('DD MMM YYY')}</div> */}
          {/* {pricingInfo.availableMinDate.toString()} */}
          <div>{moment(pricingInfo.availableMinDate, 'YYYY-MM-DD HH:mm').format('DD MMM YYYY')}</div>
          {/* <div>{moment(pricingInfo.availableMinDate.toString(), 'YYYY-MM-DD HH:mm').format('DD MMM YYYY')}</div> */}
        </div>
        <hr />

        <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold "> Av Max Date </div>
          {/* <div>{pricingInfo.availableMaxDate.toString()}</div> */}
          <div>{moment(pricingInfo.availableMaxDate, 'YYYY-MM-DD HH:mm').format('DD MMM YYYY')}</div>
        </div>
<hr />
        <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold "> Numbers of the days </div>
          <div>{pricingInfo.numberOfDays}</div>
        </div>




        {/* <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold ">Booking Information</div>
          <div>{pricingInfo.bookingType}</div>
        </div> */}



        {/* <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold ">Terms Information</div>
          <div>{pricingInfo.terms}</div>
        </div> */}
 


        <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold ">Cleaning Fee Code</div>
          <div>{pricingInfo.cleaningFee}</div>
        </div>

        <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold "> Addition Fee Guest</div>
          <div>{pricingInfo.additionalGuestFee}</div>
        </div>

        <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold "> Guest</div>
          <div>{pricingInfo.guests}</div>
        </div>

        <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold "> Security Deposite</div>
          <div>{pricingInfo.securityDeposit}</div>
        </div>

        <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold "> Weekend Fee</div>
          <div>{pricingInfo.weekendPrice}</div>
        </div>
 
        </div>


    {/* Display pricing rules information */}
    <div>
        <h2 className="text-lg font-bold mb-4">Pricing Rules Information</h2>
        <div>
          {/* Iterate through lengthOfStayDiscounts */}
          <div className='w-full'>
            <h3 className="text-xl font-bold">Length of Stay Discounts</h3>
            {pricingRulesInfo?.lengthOfStayDiscounts?.map((discount, index) => (
              <div key={index} className='grid grid-cols-2'>
                <p>Nights: {discount?.nights}</p>
                <p>Percentage: {discount?.percentage}%</p>
              </div>
            ))}
          </div>

          {/* Iterate through earlyBirdDiscounts */}
          <div>
            <h3 className="text-xl font-bold">Early Bird Discounts</h3>
            {pricingRulesInfo?.earlyBirdDiscounts?.map((discount, index) => (
              <div key={index} className='grid grid-cols-2'>
                <p>Days: {discount?.days}</p>
                <p>Percentage: {discount?.percentage}%</p>
              </div>
            ))}
          </div>

          {/* Iterate through lastMinDiscounts */}
          <div>
            <h3 className="text-xl font-bold">Last Minute Discounts</h3>
            {pricingRulesInfo?.lastMinDiscounts?.map((discount, index) => (
              <div key={index} className='grid grid-cols-2'>
                <p>Days: {discount?.days}</p>
                <p>Percentage: {discount?.percentage}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    

<div>
  <h2 className="text-lg font-bold mb-4">Step 9: Available Rules</h2>
  {availableRules.map((rule, index) => (
    <div key={index} className="mb-6 p-4 border border-gray-300 rounded-md">
        <div className="flex mb-4">
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700">Minimum Stay</label>
                  <p>{rule?.minimumStay}</p>
                </div>
                <div className="flex-grow ml-4">
                  <label className="block text-sm font-medium text-gray-700">Maximum Stay</label>
                  <p>{rule?.maximumStay}</p>
                </div>
              </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Dates</label>
        {/* Convert the Date object to a string format */}
        <p>{rule?.selectDates ? new Date(rule.selectDates).toLocaleDateString() : 'No date selected'}</p>
      </div>
    </div>
  ))}
</div>


<div>
          <h2 className="text-lg font-bold mb-4"> Checkin Procedure</h2>
 
          <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold ">CheckIn</div>
          <div>{checkInProcedure.checkin}</div>
        </div>

        <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold ">CheckOut</div>
          <div>{checkInProcedure.checkout}</div>
        </div>

        <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold ">Space</div>
          <div>{checkInProcedure.space}</div>
        </div>

        <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold "> Guest Access</div>
          <div>{checkInProcedure.guestAccess}</div>
        </div>

        <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold "> Interaction With Guest</div>
          <div>{checkInProcedure.interactionWithGuests}</div>
        </div>

        <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold "> Notes</div>
          <div>{checkInProcedure.notes}</div>
        </div>

        <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold ">House Rules</div>
          <div>{checkInProcedure.houseRules}</div>
        </div>

        <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold ">Overview</div>
          <div>{checkInProcedure.overview}</div>
        </div>

        <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold ">Getting Arround</div>
          <div>{checkInProcedure.gettingArround}</div>
        </div>

        <div className="grid grid-cols-2  items-center">
          <div className="text-lg font-bold ">Sammary</div>
          <div>{checkInProcedure.summary}</div>
        </div>
 
 
        </div>
 

        <button onClick={handleSubmit} className='py-10 bg-blue-700 rounded-md text-lg'>
          Submit Now!!
        </button>

      </div>
    </div>
  );
};

export default Submit;
