import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function ExperienceDetail() {
    const { id } = useParams();
    const [experience, setExperience] = useState(null);

    const [selectedTrip, setSelectedTrip] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [trips, setTrips] = useState([]);
    const [days, setDays] = useState([]);
    const [showTripDropdown, setShowTripDropdown] = useState(false);
    const [showDayDropdown, setShowDayDropdown] = useState(false);

    const navigate = useNavigate();
    const API_URL = "http://localhost:3000/";
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const getExperience = async () => {
            try {
                const res = await fetch(API_URL + `experiences/${id}`);
                const data = await res.json();
                if (res.status === 200) {
                    console.log('Experience data retrieved');
                    setExperience(data);
                } else {
                    console.log('There was an error retrieving the experience data');
                }
            } catch (error) {
                console.log(error);
            }
        };
        getExperience();
    }, [id]);

    const getTrips = async () => {
        try {
            const token = await getAccessTokenSilently();
            const userId = user?.sub.split('|')[1];
            const res = await fetch(API_URL + `trips/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (res.status === 404) {
                window.alert('You have not created any trips yet!');
                console.log('User has not created any trips');
            }
            if (res.status === 200) {
                console.log('Trips data retrieved');
                setTrips(data);
            } else {
                console.log('There was an error retrieving the trips data');
            }
        } catch (error) {
            console.log(error);
        }
    };

    
    const getDaysForTrip = async (tripId) => {
        try {
            const token = await getAccessTokenSilently();
            const res = await fetch(API_URL + `trips/${tripId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (res.status === 200) {
                console.log('Days data retrieved');
                if (data.TripDays.length === 0) {
                    window.alert('There are no days added to this trip yet!');
                }
                return data.TripDays;
            } else {
                console.log('There was an error retrieving the days data');
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    };
    

    const deleteExperience = async () => {
        const confirmation = window.confirm("Are you sure you want to delete this experience?");
        if (confirmation) {
            try {
                const token = await getAccessTokenSilently();
                const response = await fetch(API_URL + `experiences/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.status === 204) {
                    console.log("Experience deleted successfully")
                    navigate("/experiences");
                } else if (response.status === 403) {
                    window.alert("You can't delete an experience you didn't create");
                } else {
                    console.log("Error deleting experience");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleEditExperience = () => {
        navigate(`/experiences/${id}/edit`);
    };

    
    const handleAddToTrip = async () => {
        if (!isAuthenticated) {
            window.alert("You must be signed in to add an experience to a trip");
            navigate('/');
            return;
        }
        await getTrips(); 
        setShowTripDropdown(true);
    };

    const handleTripChange = async (tripId) => {
        setSelectedTrip(tripId);
        setShowDayDropdown(false); // Reset day dropdown when trip changes
        if (tripId) {
            const days = await getDaysForTrip(tripId);
            setDays(days);
            setShowDayDropdown(true); // Show day dropdown after selecting a trip
        }
    };

    const handleConfirmAddToTrip = async () => {
        try {
            const token = await getAccessTokenSilently();
            const res = await fetch(API_URL + `trips/${selectedTrip}/${selectedDay}/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.status === 201) {
                console.log('Experience added to trip successfully');
                window.alert("Experience added! You'll be directed to your trip's page now")
                navigate(`/trips/${selectedTrip}`);
            } else {
                console.log('Error adding experience to trip');
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    if (!experience) {
        return <div>Loading...</div>;
    }

    const isOwner = isAuthenticated && experience && experience.userId === user?.sub.split('|')[1];

    return (
        <>
            {experience && (
                <div>
                    {experience.ExperienceImage && (
                        <img
                            src={experience.ExperienceImage}
                            alt="experience" 
                            style={{ maxWidth: '50%', maxHeight: '50%', width: 'auto', height: 'auto' }}
                        />
                    )}
                    <h2>{experience.ExperienceName}</h2>

                   {/* Only show edit and delete buttons to the owner */}
                   {isOwner && (
                       <>
                           <button onClick={handleEditExperience}>Edit</button>
                           <button onClick={deleteExperience}>Delete</button>
                       </>
                   )}
                    
                    {/* Show Add to Trip button only if authenticated */}
                    {isAuthenticated && (
                        <button onClick={handleAddToTrip}>Add to Trip</button>
                    )}
                    
                    {/* Select a Trip and day dropdown */}
                    {showTripDropdown && (
                       <div>
                           <label htmlFor="tripSelect">Select a Trip:</label>
                           <select id="tripSelect" value={selectedTrip} onChange={(e) => handleTripChange(e.target.value)}>
                               <option value="">----</option>
                               {trips.map((trip) => (
                                   <option key={trip._id} value={trip._id}>{trip.TripName}</option>
                               ))}
                           </select>
                           {/* Show Select a Day dropdown after selecting a trip */}
                           {selectedTrip && (
                               <div>
                                   <label htmlFor="daySelect">Select a Day:</label>
                                   <select id="daySelect" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                                       <option value="">----</option>
                                       {days.map((day) => (
                                           <option key={day._id} value={day._id}>Day {day.DayNumber}</option>
                                       ))}
                                   </select>
                                   {/* Show Confirm button after selecting a day */}
                                   {selectedDay && (
                                       <button onClick={handleConfirmAddToTrip}>Confirm</button>
                                   )}
                               </div>
                           )}
                       </div>
                   )}

                    <p>{experience.ExperienceDescription}</p> 
                </div>
            )}
        </>
    );
}

export default ExperienceDetail;