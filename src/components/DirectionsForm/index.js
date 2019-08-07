import React, { useState } from 'react';

const DirectionsForm = ({getCoordinates}) => {

    const [formData, saveFormData] = useState({
        origin: '',
        destination: ''
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
                <input type="submit" value="Buscar ruta"/>
            </form>
        </div>
    );
};

export default DirectionsForm;