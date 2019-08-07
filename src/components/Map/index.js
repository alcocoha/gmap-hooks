import React, { useEffect, useRef, useState } from 'react';
import { loadScript } from '../../utils';
import { GOOGLE_API_URL } from '../../utils/appConfig';

const Map = (props) => {

  
  const { mapParams } = props;
  const mapRef = useRef();
  let map = null;
  let directionsDisplay = null;
  let directionsService = null;

  const initMap = (domElement, mapParams) => {
    map = new window.google.maps.Map( domElement.current, mapParams );
    directionsDisplay = new window.google.maps.DirectionsRenderer;
    directionsService = new window.google.maps.DirectionsService;
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  }
  
  const calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
    // var selectedMode = document.getElementById('mode').value;
    var selectedMode = 'DRIVING';
    directionsService.route({

      origin: {lat: 37.77, lng: -122.447},  // Haight.
      destination: {lat: 37.768, lng: -122.511},  // Ocean Beach.
      travelMode: window.google.maps.TravelMode[selectedMode]

    }, function(response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  

  useEffect(() => {
  console.log('props', props)

    if(!window.google){
      loadScript( GOOGLE_API_URL, ()=>{ initMap(mapRef, mapParams) } );
    } else {
      initMap(mapRef, mapParams);
    }
  });

  return (
    <div ref={mapRef} style={{height: '100vh', width:'100%', backgroundColor: '#00ffff'}}></div>
  )
}

export default Map;