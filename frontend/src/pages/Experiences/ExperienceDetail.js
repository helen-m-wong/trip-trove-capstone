import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ExperienceDetail() {
    const { id } = useParams();
    const [experience, setExperience] = useState(null);
    const navigate = useNavigate();
    const API_URL = "http://localhost:3000/";

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

    const deleteExperience = async () => {
        const confirmation = window.confirm("Are you sure you want to delete this experience?");
        if (confirmation) {
            try {
                const response = await fetch(API_URL + `experiences/${id}`, {
                    method: 'DELETE'
                });
                if (response.status === 204) {
                    console.log("Experience deleted successfully")
                    navigate("/experiences");
                } else if (response.status === 403) {
                    window.alert("Forbidden");
                    // add 403 error in router.js backend, user can't delete experience that isn't their own
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

    if (!experience) {
        return <div>Loading...</div>;
    }

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
                    <button onClick={handleEditExperience}>Edit</button>
                    <button onClick={deleteExperience}>Delete</button>
                    <p>{experience.ExperienceDescription}</p> 

                </div>
            )}
        </>
    );
}

export default ExperienceDetail;