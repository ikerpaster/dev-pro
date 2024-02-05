'use client'
import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Add } from '@mui/icons-material';
import React, { useState } from 'react';

const Video = ({  handleFileDrop, mediaData, setMediaData, handleFileChange, handleRemoveVIDEO_DOC }) => {
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

  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    const draggedOverIndex = index;

    if (draggedOverIndex !== draggedIndex) {
      const updatedDocuments = Array.from(mediaData.VIDEO_DOC);
      const draggedDocument = updatedDocuments[draggedIndex];
      updatedDocuments.splice(draggedIndex, 1);
      updatedDocuments.splice(draggedOverIndex, 0, draggedDocument);

      setMediaData({ ...mediaData, VIDEO_DOC: updatedDocuments });
      setDraggedIndex(draggedOverIndex);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDraggedIndex(null);
  };


  // Function to handle changes in video URL inputs
const handleVideoUrlChange = (index, value) => {
  const updatedVideoUrls = [...mediaData.videoUrl];
  updatedVideoUrls[index] = value;
  setMediaData({ ...mediaData, videoUrl: updatedVideoUrls });
};

// Function to add a new empty URL input
const addVideoUrlInput = () => {
  setMediaData({ ...mediaData, videoUrl: [...mediaData.videoUrl, ''] });
};

// Function to remove a specific URL input
const removeVideoUrlInput = (index) => {
  const updatedVideoUrls = [...mediaData.videoUrl];
  updatedVideoUrls.splice(index, 1);
  setMediaData({ ...mediaData, videoUrl: updatedVideoUrls });
};




  return (
    <div className="bg-white w-full p-4 rounded-lg ">
     
      {/* <div className="flex items-center mb-4 gap-2">
        <div className='flex bg-red-400x'>
          Video URL
        </div>

        <input
          className="border border-gray-400 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 flex flex-1"
          type="text"
          placeholder="Enter  video URL"
          value={mediaData.videoUrl}
          onChange={(e) => setMediaData({ ...mediaData, videoUrl: e.target.value })}
        />
      </div> */}

      {/* start  */}
      <div>
    {mediaData.videoUrl.map((url, index) => (
      <div key={index} className="flex items-center mb-4 gap-2">
          <input
          className="border border-gray-400 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 flex flex-1"
          type="text"
          placeholder="Enter video URL"
          value={url}
          onChange={(e) => handleVideoUrlChange(index, e.target.value)}
        />
        {/* <button onClick={() => removeVideoUrlInput(index)}>Remove</button> */}
        
        {mediaData.videoUrl.length > 1 && (
            <button
              className="bg-red-500 text-white px-4 py-1 rounded mt-1"
              onClick={() => removeVideoUrlInput(index)}
            >
              <TrashIcon className='h-5 w-5' />
            </button>
          )}

      </div>
    ))}
<div className='w-full flex justify-end '>
<button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={addVideoUrlInput}>
        <Add />
      </button>
</div>

         
    {/* <button onClick={addVideoUrlInput}>Add URL</button> */}
  </div>
{/* end  */}

      <div className="py-4">
        {/* <h2 className="text-2xl font-bold mb-4">Video Uploader</h2> */}
 

<div className='w-full bg-gray-100x h-fit flex justify-center items-center mb-8'>
            <div
              className="w-full bg-white p-2 rounded-lg shadow-md border border-dashed border-gray-400"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleFileDrop(e, 'VIDEO_DOC')}
            >
           
              <div className="flex justify-center items-center">
                <input
                  type="file"
                  id="VIDEO_DOC"
                  name="VIDEO_DOC"
                  accept="video/*"
                  multiple
                  onChange={(event) => handleFileChange(event, 'VIDEO_DOC')}
                  className="hidden"
                />
                <label
                  htmlFor="VIDEO_DOC"
                  className="cursor-pointer py-4 px-8 text-gray-500 transition duration-300 ease-in-out"
                >
                  <ArrowUpTrayIcon className='h-5 w-12 mx-auto mb-2 text-gray-400' />
                  <p className="text-center">Drag and drop or click to upload <br /> (Max file size: 300KB)</p>
                </label>
              </div>
            </div>
          </div>

 
<div className='mt-2 grid grid-cols-2 gap-4'>
        {mediaData?.VIDEO_DOC.map((document, index) => (
          <div
            key={index}
            className="relative overflow-hidden"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={handleDrop}
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

            <button
              type="button"
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              onClick={() => handleRemoveVIDEO_DOC(index)}
            >
              <TrashIcon className='w-5 h-5 ' />
            </button>

            {index === 0 ? (
              <div className='w-full bg-black p-2 absolute bottom-0 text-white text-center bg-opacity-50 rounded-bl-lg rounded-br-lg'>Cover Video</div>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
      </div>

      {/* <div className='w-3/4 h-fit'>
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
      </div> */}

{/* <div className='grid grid-cols-2 gap-2 h-fit'>
  {mediaData.videoUrl.map((videoUrl, index) => (
    <div key={index} className="aspect-w-16 aspect-h-9 h-full rounded-lg overflow-hidden mb-4">
      <iframe
        title={`YouTube Video ${index}`}
        src={`https://www.youtube.com/embed/${extractVideoId(videoUrl)}`}
        frameBorder="0"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  ))}
</div> */}

{/* <div className='grid grid-cols-2 gap-2 h-fit'>
  {mediaData.videoUrl.map((videoUrl, index) => (
    (videoUrl && videoUrl.trim() !== '') && (
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
</div> */}

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

    </div>
  );
};

export default Video;
