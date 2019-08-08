import React, { useState } from 'react';

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

    const sendCoordinates = e => {
        e.preventDefault();
        getCoordinates(formData)
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