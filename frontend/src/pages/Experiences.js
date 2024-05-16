import React, { useState, useEffect }  from 'react';
import { Link } from "react-router-dom";

function Experiences() {

    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        const getExperiences = async() => {
            try {
                const res = await fetch('/experiences');
                const data = await res.json();
                if (res.status === 200) {
                    console.log("Experiences data retrieved");
                    setExperiences(data);
                } else {
                    console.log("There was an error retrieving the data")
                }
            } catch (error) {
                console.log(error);
            }
        };
        getExperiences();
    }, []);

    return (
        <>
            <h2>Experiences</h2>
            <Link to="/experiences/add" 
            style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    backgroundColor: 'white',
                    color: 'black',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    border: 'none',
                    borderRadius: '5px',
                }}> Add Experience </Link>
            {experiences.map((experience) => (
                <div key={experience._id}>
                    <Link to={`/experiences/${experience._id}`} style={{ color: 'black' }}>
                        <h3>{experience.ExperienceName}</h3>
                    </Link>
                </div>
            ))}
        </>
    );
} 

export default Experiences;