import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ExperienceDetail() {
    const { id } = useParams();
    const [experience, setExperience] = useState(null);

    useEffect(() => {
        const getExperience = async () => {
            try {
                const res = await fetch(`/experiences/${id}`);
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


    return (
        <>
            {experience && (
                <div>
                    <h2>{experience.ExperienceName}</h2>
                    <p>{experience.ExperienceDescription}</p> 
                </div>
            )}
        </>
    );
}

export default ExperienceDetail;