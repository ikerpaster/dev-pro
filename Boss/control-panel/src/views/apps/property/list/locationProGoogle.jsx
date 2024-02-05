'use client'
import { TextField } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

const GooglePlacesAutocompletePro = ({locationInfo, setLocationInfo}) => {
  const [place, setPlace] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapSrc, setMapSrc] = useState("");

  const autocompleteInputRef = useRef(null);
  const mapIframeRef = useRef(null);

 

  const updateMapAddress = () => {
 
    setLocationInfo(prevLocationInfo => ({
      ...prevLocationInfo,
      mapAddress: {
        place: place,
        mapUrl: mapSrc,
      },
    }));
  };
 
 


  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
    setMapSrc(
      `https://maps.google.com/maps?q=${e.target.value}&z=15&output=embed`
    );
  };

  useEffect(() => {
    updateMapAddress(); // Update mapAddress whenever place or mapSrc changes
  }, [place, mapSrc]);

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = new window.google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          setCurrentLocation(currentPosition);
          setMapSrc(
            `https://maps.google.com/maps?q=${currentPosition.lat()},${currentPosition.lng()}&z=15&output=embed`
          );
          // setPlace(""); // Clear input field when locating user
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          // Handle geolocation error here
        }
      );
    } else {
      console.error("Geolocation is not supported.");
      // Handle geolocation not supported case here
    }
  };

  const handleScriptLoad = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteInputRef.current,
      {
        types: ["geocode"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const selectedPlace = autocomplete.getPlace();
      if (selectedPlace.geometry && selectedPlace.geometry.location) {
        const selectedLocation = selectedPlace.geometry.location;
        setCurrentLocation(selectedLocation);
        setMapSrc(
          `https://maps.google.com/maps?q=${selectedLocation.lat()},${selectedLocation.lng()}&z=15&output=embed`
        );
        setPlace(selectedPlace.formatted_address || ""); // Update input value with selected place address
      }
    });

    // Fetch current location when the component loads
    handleLocateMe();
  };

  const loadGoogleScript = () => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = handleScriptLoad;
    document.head.appendChild(script);
  };

  useEffect(() => {
    loadGoogleScript();
  }, []);

  const handleIframeLoad = () => {
    // Re-enable input after the iframe (map) has loaded
    autocompleteInputRef.current.disabled = false;
  };


  console.log("Place:: ", place);
  console.log("CurrentLocation:: ", currentLocation);
  console.log("Map Src ::", mapSrc);


  return (
    <div>
      {/* <h1>Google Places Autocomplete</h1> */}
      <div className="my-5 flex items-center gap-2">
        <TextField 
        label="Enter a location"
        size="small"
        value={place}
        onChange={handlePlaceChange}
        id="autocompleteInput"
        ref={autocompleteInputRef}
        // disabled
        />
 
        <button onClick={handleLocateMe} className="py-2 px-3 bg-violet-300 text-xs text-white shadow-lg rounded-lg hover:bg-violet-500 duration-500 transition transform ease-in-out">Locate Me</button>
      </div>

      {currentLocation && (
        <div style={{ width: "100%", height: "200px" }}>
          <iframe
            title="Map"
            ref={mapIframeRef}
            width="100%"
            height="240"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src={mapSrc}
            onLoad={handleIframeLoad}
          />
        </div>
      )}
    </div>
  );
};

export default GooglePlacesAutocompletePro;