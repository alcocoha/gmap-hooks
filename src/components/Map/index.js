import React, { useEffect, useRef } from 'react';
import { loadScript } from '../../utils';
import { GOOGLE_API_URL } from '../../utils/appConfig';

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

      console.log('JSON.parse(coordinates.origin)', coordinates.origin)
      console.log('JSON.parse(coordinates.destination)', coordinates.destination)
      // let geocoder = new window.google.maps.Geocoder();

      // const directionArray = [coordinates.origin, coordinates.destination];

      // for (let i = 0; i < directionArray.length; i++) {
      //   console.log('directionArray[i]', i, directionArray[i])
      //   geocoder.geocode({'address': directionArray[i]}, (results, status)=>{
      //     console.log('--------results', results)
      //     console.log('--------foooooooo', results[0].geometry.location.lat())
      //     console.log('--------status', status);
      //   })
        
      // }
      
      
      directionsService.route({
  
        origin: coordinates.origin,
        destination: coordinates.destination,
        travelMode: window.google.maps.TravelMode[coordinates.mode]
  
      }, function(response, status) {
        console.log('response', response)
        console.log('status', status)
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