import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditExperience() {
    const { id } = useParams();
    const [ExperienceName, setExperienceName] = useState('');
    const [ExperienceDescription, setExperienceDescription] = useState('');
    const [ExperienceImage, setExperienceImage] = useState('');
    const navigate = useNavigate();
    const API_URL = "http://localhost:3000/";

    useEffect(() => {
        const getExperience = async () => {
            try {
                const res = await fetch(API_URL + `experiences/${id}`);
                const data = await res.json();
                if (res.status === 200) {
                    console.log('Experience data retrieved');
                    setExperienceName(data.ExperienceName);
                    setExperienceDescription(data.ExperienceDescription);
                    setExperienceImage(data.ExperienceImage);
                } else {
                    console.log('There was an error retrieving the experience data');
                }
            } catch (error) {
                console.log(error);
            }
        };
        getExperience();
    }, [id]);

    const handleImageChange = (e) => {

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setExperienceImage(reader.result); // Preview image
        };
        reader.onerror = (error) => {
            console.log("Error: ", error);
        };


    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateExperience();
    };

    const updateExperience = async () => {
        try {
            const res = await fetch(API_URL + `experiences/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ExperienceName, ExperienceDescription, ExperienceImage})
            });
            if (res.status === 200) {
                console.log('Experience updated successfully');
                navigate(`/experiences/${id}`);
            } else {
                console.error('Error updating experience');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Edit Experience</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="experienceName">Experience Name:</label>
                <input
                    type="text"
                    id="experienceName"
                    name="ExperienceName"
                    value={ExperienceName}
                    onChange={e => setExperienceName(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="experienceDescription">Experience Description:</label>
                <textarea
                    id="experienceDescription"
                    name="ExperienceDescription"
                    value={ExperienceDescription}
                    onChange={e => setExperienceDescription(e.target.value)}
                    required
                ></textarea>
                <br />
                <label htmlFor="experienceImage">Upload Image:</label>
                <input
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                />
                <br />
                {ExperienceImage && <img width={100} height={100} src={ExperienceImage} alt="preview" />}
                <br />
                <button type="submit" id="submit">Save</button>
            </form>
        </div>
    );
}

export default EditExperience;
