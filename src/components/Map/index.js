import React, { useEffect, useRef } from 'react';
import { loadScript } from '../../utils';
import { GOOGLE_API_URL } from '../../utils/appConfig';


// origin: {"lat": 37.77, "lng": -122.447},  // Haight.
//       destination: {"lat": 37.768, "lng": -122.511},  // Ocean Beach.


//       19.386302, -99.165098

//       19.361638, -99.115119


//       {"lat": 19.386302, "lng": -99.165098}
//       {"lat": 19.361638, "lng": -99.115119}

const Map = (props) => {

  const { mapParams, coordinates } = props;
  console.log('coordinates', coordinates)
  
  const mapRef = useRef();

  const initMap = (domElement, mapParams) => {
    let map = new window.google.maps.Map( domElement.current, mapParams );
    let directionsDisplay = new window.google.maps.DirectionsRenderer;
    let directionsService = new window.google.maps.DirectionsService;
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  }
  
  const calculateAndDisplayRoute = (directionsService, directionsDisplay) => {

    if(coordinates.origin && coordinates.destination) {

      console.log('JSON.parse(coordinates.origin)', JSON.parse(coordinates.origin))
      console.log('JSON.parse(coordinates.destination)', JSON.parse(coordinates.destination))
      
      directionsService.route({
  
        origin: JSON.parse(coordinates.origin),
        destination: JSON.parse(coordinates.destination),
        travelMode: window.google.maps.TravelMode[coordinates.mode]
  
      }, function(response, status) {
        if (status == 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    
    
    
    
    }

  }

  useEffect(() => {
  console.log('props', props)

    if(!window.google){
      console.log('useEffect----------1')
      loadScript( GOOGLE_API_URL, ()=>{ initMap(mapRef, mapParams) } );
    } else {
      console.log('useEffect----------2')
      initMap(mapRef, mapParams);
    }
  });

  return (
    <div ref={mapRef} style={{height: '100vh', width:'100%', backgroundColor: '#00ffff'}}></div>
  )
}

export default Map;