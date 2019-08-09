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

  
  
  
//   const fook = {
//     "3028c790-b554-11e9-95e2-2938490d19d2": {
//     "APELLIDOMATERNO": "AMaterno1",
//     "APELLIDOPATERNO": "APaterno1",
//     "FECHANACIMIENTODDMMYYYY": "19/18/1994",
//     "GENERO": "M",
//     "NOMBRE": "NombreTest1",
//     "NOPOLIZA": "001P00x"
//     },
//     "302a0010-b554-11e9-95e2-2938490d19d2": {
//     "APELLIDOMATERNO": "AMaterno2",
//     "APELLIDOPATERNO": "APaterno2",
//     "FECHANACIMIENTODDMMYYYY": "19/18/1995",
//     "GENERO": "M",
//     "NOMBRE": "NombreTest2",
//     "NOPOLIZA": "001P00x"
//     }
// }





// const demos = Object.keys(fook).map( foo => {
//   let demos = fook[foo];
//   demos["key"] = foo
//   return demos
// })

// const demos = Object.keys(fook).map( key => ({ key, ...fook[key] }))


// let ar = [];
// for( let key in fook){
//   ar.push({ key, ...fook[key] });
// }

// const newFook = Object.entries(fook).reduce((key, b) => ({ key, ...b }));



// console.log(newFook);
// console.log('demos', demos)
// console.log('foo------', ar)
// console.log('demos', demos)

  return (
    <div className="App">
      <DirectionsForm getCoordinates={getCoordinates}/>
      <Map 
        coordinates = {coordinates}
        mapParams={
          {
            center:  { lat: 19.358436, lng: -99.089796 },
            zoom: 13,

            // styles: 
          }
        }
      />
    </div>
  );
}

export default App;
   