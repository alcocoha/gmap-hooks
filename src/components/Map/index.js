import React, { useEffect, useRef } from 'react';
import { loadScript } from '../../utils';
import { GOOGLE_API_URL } from '../../utils/appConfig';

const Map = (props) => {

  const { mapParams, coordinates } = props;
  console.log('coordinates', coordinates)
  
  const mapRef = useRef();

  let demopoly = null;

  const initMap = (domElement, mapParams) => {
    let map = new window.google.maps.Map( domElement.current, mapParams );
    let directionsDisplay = new window.google.maps.DirectionsRenderer;
    let directionsService = new window.google.maps.DirectionsService;
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay);

    const poligonFoo = [
      {lat: 19.360436, lng: -99.084578},
      {lat: 19.353836, lng: -99.081102},
      {lat: 19.353182, lng: -99.088165},
      {lat: 19.356346, lng: -99.091412},
    ];
    
    demopoly = new window.google.maps.Polygon({
      paths: poligonFoo,
      // strokeColor: '#FF0000',
      // strokeOpacity: 0.8,
      strokeWeight: 0,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    });
    demopoly.setMap(map);

    // var latlng = new window.google.maps.LatLng(19.356585, -99.086524);

    // console.log('!----------------------: ', window.google.maps.geometry && window.google.maps.geometry.poly.containsLocation(latlng, demopoly))
  }


  
  const calculateAndDisplayRoute = (directionsService, directionsDisplay) => {

    if(coordinates.origin && coordinates.destination) {
 
      directionsService.route({
  
        origin: coordinates.origin,
        destination: coordinates.destination,
        travelMode: window.google.maps.TravelMode[coordinates.mode]
  
      }, function(response, status) {
        console.log('response', response)
        let foooo = response.routes[0].legs[0].steps.map( point => {
          console.log('point', point)
          return point.lat_lngs.map(item => {

            const latlng = new window.google.maps.LatLng(item.lat(), item.lng());
            console.log('point.end_point', item.lat(), item.lng())
            if(window.google.maps.geometry && window.google.maps.geometry.poly.containsLocation(latlng, demopoly)){
              return point.distance
            }

          });
        });
        console.log('foooo', foooo)
        console.log('response', response.routes[0].legs[0].steps)
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