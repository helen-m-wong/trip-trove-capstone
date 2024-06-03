import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './Trips.module.css';

function TripDetail() {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [openDays, setOpenDays] = useState({});

    const [moveExperienceId, setMoveExperienceId] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null); 
    const [originalDay, setOriginalDay] = useState(null);

    const navigate = useNavigate();
    const API_URL = "http://localhost:3000/";
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    
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
            const token = await getAccessTokenSilently();
            const res = await fetch(API_URL + `trips/${id}/add-day`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
                const token = await getAccessTokenSilently();
                const response = await fetch(API_URL + `trips/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.status === 204) {
                    console.log("Trip deleted successfully");
                    navigate("/trips");
                } else if (response.status === 403) {
                    window.alert("You can't delete a trip you didn't create");
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
                const token = await getAccessTokenSilently();
                const response = await fetch(API_URL + `trips/${id}/delete-day`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
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

    const removeExperience = async (dayId, expId) => {
        const confirmation = window.confirm("Are you sure you want to remove this experience?");
        if (confirmation) {
            try {
                const token = await getAccessTokenSilently();
                const response = await fetch(API_URL + `trips/${id}/${dayId}/${expId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.status === 204) {
                    console.log("Experience removed successfully");
                    const updatedTrip = await fetch(API_URL + `trips/${id}`);
                    const data = await updatedTrip.json();
                    setTrip(data);
                } else if (response.status === 403) {
                    window.alert("Forbidden");
                } else {
                    console.log("Error removing experience");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const showSelectDay = async (experienceId, dayId1) => {
        setMoveExperienceId(experienceId);
        setOriginalDay(dayId1);
    };

    const handleMoveExperience = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(API_URL + `trips/${id}/${originalDay}/${selectedDay}/${moveExperienceId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                console.log("Experience moved successfully");
                window.alert("Experience moved successfully");
                window.location.reload();
            } else if (response.status === 400) {
                window.alert("The experience is already in the day you selected!");
            } else if (response.status === 403) {
                window.alert("Forbidden");
            } else {
                console.log("Error moving experience");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditTrip = () => {
        navigate(`/trips/${id}/edit`);
    };

    const toggleDay = (dayNumber) => {
        setOpenDays((prevOpenDays) => ({
            ...prevOpenDays,
            [dayNumber]: !prevOpenDays[dayNumber],
        }));
    };

    if (!trip) {
        return <div>Loading...</div>;
    }
    
    // Only check ownership if authenticated and trip data is loaded
    const isOwner = isAuthenticated && trip && trip.userId === user?.sub.split('|')[1]; 

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
                    
                    {isOwner && (
                        <>
                            <button onClick={handleEditTrip}>Edit</button>
                            <button onClick={deleteTrip}>Delete Trip</button>
                            {trip.TripDays.length > 0 && <button onClick={deleteDay}>Delete Day</button>}
                        </>
                    )}

                    <p>{trip.TripDescription}</p>
                    {trip.TripDays.map((day) => (
                        <div key={day._id}>
                            <div>
                                <p>Day {day.DayNumber}</p>
                                <button onClick={() => toggleDay(day.DayNumber)}>
                                    {openDays[day.DayNumber] ? 'Hide Experiences' : 'Show Experiences'}
                                </button>
                            </div>
                            {openDays[day.DayNumber] && (
                                <div>
                                    {day.DayExperiences.length > 0 ? (
                                        day.DayExperiences.map((experience) => (
                                            <div key={experience._id}>
                                                <Link to={`/experiences/${experience._id}`} className={styles.expName} >{experience.ExperienceName}</Link>
                                                {isOwner && (
                                                    <button onClick={() => removeExperience(day._id, experience._id)}>Remove</button>
                                                )}
                                                {isOwner && (
                                                    <div>
                                                        {/* Shows Select a Day dropdown and sets moveExperienceId and originalDay */}
                                                        <button onClick={() => showSelectDay(experience._id, day._id)}>Move to another day</button>
                                                        {moveExperienceId === experience._id && (
                                                            <div>
                                                                <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                                                                    <option value="">----</option>
                                                                    {trip.TripDays.map((day) => (
                                                                        <option key={day._id} value={day._id}>Day {day.DayNumber}</option>
                                                                    ))}
                                                                </select>
                                                                <button onClick={handleMoveExperience}>Confirm</button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                <p>{experience.ExperienceDescription}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No experiences added yet</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    <br></br>
                    {isOwner && <button onClick={addDay}>Add Day</button>}
                </div>
            )}
        </>
    );
}

export default TripDetail;