import { UserCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const ROOMiMAGES = ({ isOpen, onClose, data }) => {

    const [showImage, setShowImage] = useState(true);
    const [showVideo, setSHowVideo] = useState(false);

    const ImageClick = () => {
        setShowImage(true);
        setSHowVideo(false);
    }

    const videoClick = () => {
        setShowImage(false);
        setSHowVideo(true);
    }


    
    const MGT_CARD = ({ item }) => {
        const totalRecords = 300;
        const route = useRouter();
        const redirectPage = (page) => {
            // alert(page);
            route.push(page);
        };

      
        return (
            <>

                <div onClick={() => redirectPage(item?.pageLink)} className=" p-6 rounded-lg w-48 shadow-lg bg-white">
                    <div className="flex items-center justify-center h-16 w-16 bg-indigo-500 rounded-full mx-auto mb-4">
                        <UserCircleIcon className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-sm font-semibold text-center mb-2">{item?.name}</h2>
                    <p className="text-gray-500 text-center">Total Records: {totalRecords}</p>
                </div>
            </>

        )
    }
    // console.log("the data", data);

    // SLIDE IMAGE CARD 
    const LISTIMAGE_CARD = () => {
        return (
            <div className='w-full p-2 bg-yellow-300x'>

                <div className=' w-full h-fit bg-green-500 object-contain shadow-lg  border-2 border-gray-600 shadow-black rounded-lg overflow-hidden'>
                    <img src="/assets/images/pic1.jpeg" className='' alt='img' />
                </div>
            </div>
        )
    }
    const videoUrl ="https://www.youtube.com/watch?v=eoqj2_ICaQc";
    function extractVideoId(url) {
        const videoIdRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
        const match = url.match(videoIdRegex);
        return match ? match[1] : '';
      }

    
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-50 py-10 ">
                    <div className="fixed inset-0 bg-black bg-opacity-50"></div>
                    {/* Make this full screen width */}
                    <div className="bg-white z-50 overflow-hidden shadow-2xl shadow-black rounded-lg p-8x sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[70%] min-h-screenx max-h-full">
                        <div onClick={onClose} className='bg-red-400x flex justify-end items-start cursor-pointer'>
                            <span className='h-5 w-5 mt-2 mr-2 bg-lime-500 flex items-center justify-center text-center text-lg rounded-lg text-white'> &times; </span>
                        </div>
                        <div className='w-full bg-red-500x '>


                            <div className="shadow-md pb-2 text-2xl font-semibold mb-4 text-center flex justify-evenly">
                                <span>
                                    Room Name here
                                </span>

                                <div className='w-fit space-x-10'>
                                    <span onClick={ImageClick} className='cursor-pointer bg-red-300 px-4 text-md font-normal uppercase text-white shadow-gray-200 shadow-md rounded-md'>
                                        Images
                                    </span>
                                    <span onClick={videoClick} className='cursor-pointer bg-red-300 px-4 text-md font-normal uppercase text-white shadow-gray-200 shadow-md rounded-md'>
                                        Video
                                    </span>

                                </div>
                            </div>

                            {/* this is related to images  */}
                            {showImage && (
                                <div className='flex bg-red-500x py-10  px-5 lg:h-[480px]x xlg:h-[700px]  menu bg-red-500x'>

                                    {/* left  */}
                                    <div className='relative bg-green-500x w-8/12 h-44x overflow-hidden p-5'>
                                        {/* left side  */}
                                        <img src="/assets/images/pic1.jpeg" className='h-full object-contain shadow-lg  border-2 border-gray-600 shadow-black rounded-lg' />
                                        <div className='w-full bg-red-400x  text-right -mt-10 h-44x bg-red-400x'>
                                            <span className=' py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-lg text-amber-400 px-3 shadow-lg shadow-black font-semibold cursor-pointer hover:scale-110 transition transform ease-in-out 3s'>
                                                Make this as cover Image
                                            </span></div>
                                    </div>
                                    {/* right  */}
                                    <div className='bg-white h-fullx w-[33%] lg:h-[400px] h-[800px] overflow-y-auto menu '>
                                        <div className='grid grid-cols-2 w-full gap-1 menu'>
                                            <LISTIMAGE_CARD />
                                            <LISTIMAGE_CARD />
                                            <LISTIMAGE_CARD />
                                            <LISTIMAGE_CARD />
                                            <LISTIMAGE_CARD />
                                            <LISTIMAGE_CARD />
                                            <LISTIMAGE_CARD />
                                            <LISTIMAGE_CARD />
                                            <LISTIMAGE_CARD />
                                            <LISTIMAGE_CARD />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* then this is related to vodeos  */}
                            {showVideo && (

                            <div className='w-full py-10 bg-red-400x mx-auto'>
                             
                            
                             <div className='px-10 h-[400px]'>
      
          <div className="aspect-w-16 aspect-h-9 h-full rounded-lg overflow-hidden shadow-lg shadow-gray-200">
            <iframe
              title="YouTube Video"
              src={`https://www.youtube.com/embed/${extractVideoId(videoUrl)}`}
              frameBorder="0"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        
                             
                            </div>
                            </div>
                            )}


                          
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default ROOMiMAGES