import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TripDetail() {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const navigate = useNavigate();
    const API_URL = "http://localhost:3000/";

    useEffect(() => {
        const getTrip = async () => {
            try {
                const res = await fetch(API_URL + `trips/${id}`);
                const data = await res.json();
                if (res.status === 200) {
                    console.log('Trip data retrieved');
                    setTrip(data);
                } else {
                    console.log('There was an error retrieving the trip data');
                }
            } catch (error) {
                console.log(error);
            }
        };
        getTrip();
    }, [id]);

    const addDay = async () => {
        try {
            const res = await fetch(API_URL + `trips/${id}/add-day`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.status === 201) {
                console.log('Day added successfully');
                const updatedTrip = await fetch(API_URL + `trips/${id}`);
                const data = await updatedTrip.json();
                setTrip(data);
            } else {
                console.error('Error adding day');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTrip = async () => {
        const confirmation = window.confirm("Are you sure you want to delete this trip?");
        if (confirmation) {
            try {
                const response = await fetch(API_URL + `trips/${id}`, {
                    method: 'DELETE'
                });
                if (response.status === 204) {
                    console.log("Trip deleted successfully");
                    navigate("/trips");
                } else if (response.status === 403) {
                    window.alert("Forbidden");
                    // add 403 error in router.js backend, user can't delete trip that isn't their own
                } else {
                    console.log("Error deleting trip");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const deleteDay = async () => {
        const confirmation = window.confirm("Are you sure you want to delete the most recently added day? This will also delete all experiences in the day.");
        if (confirmation) {
            try {
                const response = await fetch(API_URL + `trips/${id}/delete-day`, {
                    method: 'DELETE'
                });
                if (response.status === 204) {
                    console.log("Last day deleted successfully");
                    const updatedTrip = await fetch(API_URL + `trips/${id}`);
                    const data = await updatedTrip.json();
                    setTrip(data);
                } else if (response.status === 403) {
                    window.alert("Forbidden");
                    // add 403 error in router.js backend, user can't delete trip that isn't their own
                } else {
                    console.log("Error deleting day");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleEditTrip = () => {
        navigate(`/trips/${id}/edit`);
    };

    if (!trip) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {trip && (
                <div>
                    {trip.TripImage && (
                        <img
                            src={trip.TripImage}
                            alt="trip" 
                            style={{ maxWidth: '50%', maxHeight: '50%', width: 'auto', height: 'auto' }}
                        />
                    )}
                    <h2>{trip.TripName}</h2>
                    <button onClick={handleEditTrip}>Edit</button>
                    <button onClick={deleteTrip}>Delete Trip</button>
                    {trip.TripDays.length > 0 && <button onClick={deleteDay}>Delete Day</button>}
                    <p>{trip.TripDescription}</p>
                    {trip.TripDays.map((day) => (
                        <div key={day._id}>
                            <p>Day {day.DayNumber}</p>
                            <p>Experiences:</p>
                            {day.DayExperiences.map((experience) => (
                                <div key={experience._id}>
                                    {/* Show experiences once implemented */}
                                </div>
                            ))}
                        </div>
                    ))}
                    <button onClick={addDay}>Add Day</button>
                </div>
            )}
        </>
    );
}

export default TripDetail;