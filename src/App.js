import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './components/Map';
import DirectionsForm from './components/DirectionsForm';

function App() {

  const [coordinates, saveCoordinates] = useState({});

  const getCoordinates = (data = {}) => {
    console.log('entro --- getCoordinates', data)
    saveCoordinates(data);
    console.log('coordinates---1', coordinates)
  }

  return (
    <div className="App">
      <DirectionsForm getCoordinates={getCoordinates}/>
      <Map 
        coordinates = {coordinates}
        mapParams={
          {
            center:  { lat: 40.771, lng: -73.974 },
            zoom: 13
          }
        }
      />
    </div>
  );
}

export default App;
   