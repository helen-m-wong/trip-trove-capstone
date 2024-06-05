import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function EditTrip() {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [TripName, setTripName] = useState('');
    const [TripDescription, setTripDescription] = useState('');
    const [TripImage, setTripImage] = useState('');
    const navigate = useNavigate();
    const API_URL = "https://trip-trove-425520.wl.r.appspot.com/";
    const { getAccessTokenSilently, isAuthenticated, user, loginWithRedirect } = useAuth0();

    useEffect(() => {
        const getTrip = async () => {
            try {
                const res = await fetch(API_URL + `trips/${id}`);
                const data = await res.json();
                if (res.status === 200) {
                    console.log('Trip data retrieved');
                    setTrip(data);
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

    useEffect(() => {
        if (trip && isAuthenticated && trip.userId !== user?.sub.split('|')[1]) {
            window.alert('You cannot edit a trip you did not create');
            navigate('/');
        }
    }, [trip, isAuthenticated, user, navigate]);

    if (!isAuthenticated) {
        loginWithRedirect();
        return <div>Redirecting to login...</div>;
    }

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
            const token = await getAccessTokenSilently();
            const res = await fetch(API_URL + `trips/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
