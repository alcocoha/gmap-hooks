import React, { useState } from 'react';
import axios from 'axios';
import { GOOGLE_API_KEY } from '../../utils/appConfig';

const DirectionsForm = ({getCoordinates}) => {

    const [formData, saveFormData] = useState({
        origin: '',
        destination: '',
        mode: '',
    });

    const handlerChange = e => {
        saveFormData({
            ...formData,
            [e.target.name] : e.target.value
        });

        console.log('formData', formData)
    }

    const sendCoordinates = async (e) => {
        e.preventDefault();
        getCoordinates(formData)
        // const url = `https://maps.googleapis.com/maps/api/geocode/json`;
        // console.log('destination', formData.destination)

        // const latlngDestination = await axios.get( url, { params: { address : formData.destination, key : GOOGLE_API_KEY }});
        // console.log('latlngDestination', latlngDestination.data.results)
        // const latlngOrigin = await axios.get( url, { params: { address : formData.origin, key : GOOGLE_API_KEY }});
        // console.log('latlngOrigin', latlngOrigin.data.results)
    }

    return (
        <div>
            <form
                onSubmit={sendCoordinates}
            >
                Origen:<br/>
                <input type="text" name="origin" value={formData.origin} onChange={handlerChange}/><br/>
                Destino:<br/>
                <input type="text" name="destination" value={formData.destination} onChange={handlerChange}/><br/>
                <select name="mode" onChange={handlerChange}>
                    <option value="DRIVING">Driving</option>
                    <option value="WALKING">Walking</option>
                    <option value="BICYCLING">Bicycling</option>
                    <option value="TRANSIT">Transit</option>
                </select>
                <br/>
                <input type="submit" value="Buscar ruta"/>
            </form>
        </div>
    );
};

export default DirectionsForm;