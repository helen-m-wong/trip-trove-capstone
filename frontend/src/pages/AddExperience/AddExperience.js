import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function AddExperience() {
    const [experienceName, setExperienceName] = useState('');
    const [experienceDescription, setExperienceDescription] = useState('');
    const navigate = useNavigate();
    const API_URL = "http://localhost:3000/";

    const addExperience = async () => {
        try {
            const res = await fetch(API_URL + 'experiences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ExperienceName: experienceName,
                    ExperienceDescription: experienceDescription
                })
            });
            console.log(res);
            if (res.status === 201) {
                console.log('Experience added successfully');
                const data = await res.json();
                navigate("/experiences/" + data._id);
            } else {
                console.error('Error adding experience');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Add Experience</h2>
            <form onSubmit={(e) => {e.preventDefault();}}>
                <label htmlFor="experienceName" className="required">
                    Experience Name:
                    <input
                        id="experienceName"
                        type="text"
                        value={experienceName}
                        onChange={(e) => setExperienceName(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Experience Description:
                    <input
                        id="experienceDescription"
                        type="text"
                        value={experienceDescription}
                        onChange={(e) => setExperienceDescription(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit" onClick={addExperience} id="submit">Add Experience</button>
            </form>
        </div>
    );
}

export default AddExperience;