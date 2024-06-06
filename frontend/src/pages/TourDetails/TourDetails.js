import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TourDetails.module.css';
import { useParams } from 'react-router-dom';

const TourDetails = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response = await axios.get(`/trips/${id}`);
                setTrip(response.data);
            } catch (err) {
                setError('Unable to fetch trip details');
            } finally {
                setLoading(false);
            }
        };

        fetchTrip();
    }, [id]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="tour-details">
            <h1>{trip.TripName}</h1>
            <p>{trip.TripDescription}</p>
            <div className="days-list">
                {trip.TripDays.map((day) => (
                    <div key={day._id} className="day">
                        <h2>Day {day.DayNumber}</h2>
                        <ul className="experiences-list">
                            {day.DayExperiences.map((experience) => (
                                <li key={experience._id}>{experience.ExperienceName}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TourDetails;
