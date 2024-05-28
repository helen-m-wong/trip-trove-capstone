import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TripDetail() {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
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
                window.location.reload();
            } else {
                console.error('Error adding day');
            }
        } catch (error) {
            console.log(error);
        }
    };

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