import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

function AddTrip() {
    const [tripName, setTripName] = useState('');
    const [tripDescription, setTripDescription] = useState('');
    const [tripImage, setTripImage] = useState('');
    const navigate = useNavigate();
    const API_URL = "https://trip-trove-425520.wl.r.appspot.com/";
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    const addTrip = async (event) => {
        event.preventDefault();
        if (!isAuthenticated) {
            console.error('User is not authenticated');
            return;
        }

        try {
            const token = await getAccessTokenSilently();
            const res = await fetch(API_URL + 'trips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    TripName: tripName,
                    TripDescription: tripDescription,
                    TripImage: tripImage
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

    const convertToBase64 = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setTripImage(reader.result); // Preview image
        };
        reader.onerror = (error) => {
            console.log("Error: ", error);
        };
    };

    return (
        <div>
            <h2>Add Trip</h2>
            <form onSubmit={addTrip}>
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
                    <textarea
                        id="tripDescription"
                        type="text"
                        value={tripDescription}
                        onChange={(e) => setTripDescription(e.target.value)}
                        required
                    ></textarea>
                </label>
                <br />
                <label>
                    <b>Upload Image: </b>
                    <input
                        accept="image/*"
                        type="file"
                        onChange={convertToBase64}
                    />
                </label>
                <br />
                {tripImage && <img width={100} height={100} src={tripImage} alt="preview" />}
                <br />
                <button type="submit" id="submit">Add Trip</button>
            </form>
        </div>
    );
}

export default withAuthenticationRequired(AddTrip);