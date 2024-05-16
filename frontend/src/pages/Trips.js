import React, { useState, useEffect }  from 'react';
import { Link } from "react-router-dom";

function Trips() {

    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const getTrips = async() => {
            try {
                const res = await fetch('/trips');
                const data = await res.json();
                if (res.status === 200) {
                    console.log("Trips data retrieved");
                    setTrips(data);
                } else {
                    console.log("There was an error retrieving the data")
                }
            } catch (error) {
                console.log(error);
            }
        };
        getTrips();
    }, []);

    return (
        <>
            <h2>Trips</h2>
            <Link to="/trips/add">Add Trip</Link>
            {trips.map((trip) => (
                <div key={trip._id}>
                    <Link to={`/trips/${trip._id}`}>
                        <h3>{trip.TripName}</h3>
                    </Link>
                </div>
            ))}
        </>
    );
} 

export default Trips;