'use client'
import React, { useState, useEffect, useRef } from "react";

const GooglePlacesAutocomplete = () => {
  const [place, setPlace] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapSrc, setMapSrc] = useState("");

  const autocompleteInputRef = useRef(null);

  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
    setMapSrc(
      `https://maps.google.com/maps?q=${e.target.value}&z=15&output=embed`
    );
  };

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
          setPlace(""); // Clear input field when locating user
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

  return (
    <div>
      <h1>Google Places Autocomplete</h1>
      <div className="my-10">
      <input
        id="autocompleteInput"
        ref={autocompleteInputRef}
        type="text"
        placeholder="Enter a location"
        value={place}
        onChange={handlePlaceChange}
      />
      <button onClick={handleLocateMe}>Locate Me</button>
      </div>
      
      {currentLocation && (
        <div style={{ width: "100%", height: "400px" }}>
          <iframe
            title="Map"
            width="100%"
            height="400"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src={mapSrc}
          />
        </div>
      )}
    </div>
  );
};

export default GooglePlacesAutocomplete;
