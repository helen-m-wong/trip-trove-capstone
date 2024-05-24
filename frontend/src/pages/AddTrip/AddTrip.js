import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function AddTrip() {
    const [tripName, setTripName] = useState('');
    const [tripDescription, setTripDescription] = useState('');
    const navigate = useNavigate();
    const API_URL = "http://localhost:3000/";

    const addTrip = async () => {
        try {
            const res = await fetch(API_URL + 'trips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    TripName: tripName,
                    TripDescription: tripDescription
                })
            });
            console.log(res);
            if (res.status === 201) {
                console.log('Trip added successfully');
                const data = await res.json();
                navigate("/trips/" + data._id);
            } else {
                console.error('Error adding trip');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Add Trip</h2>
            <form onSubmit={(e) => {e.preventDefault();}}>
                <label htmlFor="tripName" className="required">
                    Trip Name:
                    <input
                        id="tripName"
                        type="text"
                        value={tripName}
                        onChange={(e) => setTripName(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Trip Description:
                    <input
                        id="tripDescription"
                        type="text"
                        value={tripDescription}
                        onChange={(e) => setTripDescription(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit" onClick={addTrip} id="submit">Add Trip</button>
            </form>
        </div>
    );
}

export default AddTrip;