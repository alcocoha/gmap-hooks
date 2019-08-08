import React, { useEffect, useRef } from 'react';
import { loadScript } from '../../utils';
import { GOOGLE_API_URL } from '../../utils/appConfig';

const Map = (props) => {

  const { mapParams, coordinates } = props;
  console.log('coordinates', coordinates)
  
  const mapRef = useRef();

  console.log('Math.sqrt(3857799)', Math.sqrt(3857799))

  const initMap = (domElement, mapParams) => {
    let map = new window.google.maps.Map( domElement.current, mapParams );
    let directionsDisplay = new window.google.maps.DirectionsRenderer;
    let directionsService = new window.google.maps.DirectionsService;
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay);
    var cityCircle = new window.google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: {lat: 19.356483, lng: -99.086517},
      radius: 1000
    });
  }
  
  const calculateAndDisplayRoute = (directionsService, directionsDisplay) => {

    if(coordinates.origin && coordinates.destination) {
 
      directionsService.route({
  
        origin: coordinates.origin,
        destination: coordinates.destination,
        travelMode: window.google.maps.TravelMode[coordinates.mode]
  
      }, function(response, status) {
        console.log('response', response)
        console.log('response', response.routes[0].legs[0].steps[0].instructions)
        console.log('status', status)
        if (status === 'OK') {
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