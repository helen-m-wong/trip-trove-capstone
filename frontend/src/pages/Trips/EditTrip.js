import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditTrip() {
    const { id } = useParams();
    const [TripName, setTripName] = useState('');
    const [TripDescription, setTripDescription] = useState('');
    const [TripImage, setTripImage] = useState('');
    const navigate = useNavigate();
    const API_URL = "http://localhost:3000/";

    useEffect(() => {
        const getTrip = async () => {
            try {
                const res = await fetch(API_URL + `trips/${id}`);
                const data = await res.json();
                if (res.status === 200) {
                    console.log('Trip data retrieved');
                    setTripName(data.TripName);
                    setTripDescription(data.TripDescription);
                    setTripImage(data.TripImage);
                } else {
                    console.log('There was an error retrieving the trip data');
                }
            } catch (error) {
                console.log(error);
            }
        };
        getTrip();
    }, [id]);

    const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setTripImage(reader.result); // Preview image
        };
        reader.onerror = (error) => {
            console.log("Error: ", error);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateTrip();
    };

    const updateTrip = async () => {
        try {
            const res = await fetch(API_URL + `trips/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ TripName, TripDescription, TripImage})
            });
            if (res.status === 200) {
                console.log('Trip updated successfully');
                navigate(`/trips/${id}`);
            } else {
                console.error('Error updating trip');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Edit Trip</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="tripName">Trip Name:</label>
                <input
                    type="text"
                    id="tripName"
                    name="TripName"
                    value={TripName}
                    onChange={e => setTripName(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="tripDescription">Trip Description:</label>
                <textarea
                    id="tripDescription"
                    name="TripDescription"
                    value={TripDescription}
                    onChange={e => setTripDescription(e.target.value)}
                ></textarea>
                <br />
                <label htmlFor="tripImage">Upload Image:</label>
                <input
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                />
                <br />
                {TripImage && <img width={100} height={100} src={TripImage} alt="preview" />}
                <br />
                <button type="submit" id="submit">Save</button>
            </form>
        </div>
    );
}

export default EditTrip;
