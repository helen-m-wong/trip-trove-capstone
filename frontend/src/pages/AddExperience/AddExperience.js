import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

function AddExperience() {
    const [experienceName, setExperienceName] = useState('');
    const [experienceDescription, setExperienceDescription] = useState('');
    const [experienceImage, setExperienceImage] = useState('');
    const navigate = useNavigate();
    const API_URL = "http://localhost:3000/";
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    const addExperience = async (event) => {
        event.preventDefault();
        if (!isAuthenticated) {
            console.error('User is not authenticated');
            return;
        }

        try {
            const token = await getAccessTokenSilently();
            const res = await fetch(API_URL + 'experiences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ExperienceName: experienceName,
                    ExperienceDescription: experienceDescription,
                    ExperienceImage: experienceImage
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

    const convertToBase64 = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setExperienceImage(reader.result); // Preview image
        };
        reader.onerror = (error) => {
            console.log("Error: ", error);
        };
    };

    return (
        <div>
            <h2>Add Experience</h2>
            <form onSubmit={addExperience}>
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
                <label htmlFor="experienceDescription" className="required">
                    Experience Description:
                    <textarea
                        id="experienceDescription"
                        type="text"
                        value={experienceDescription}
                        onChange={(e) => setExperienceDescription(e.target.value)}
                        required
                    ></textarea>
                </label>
                <br />
                <label>
                    <b>Upload Image: </b>
                    <input
                        accept="image/*"
                        type="file"
                        onChange={convertToBase64}
                    />
                </label>
                <br />
                {experienceImage && <img width={100} height={100} src={experienceImage} alt="preview" />}
                <br />
                <button type="submit" id="submit">Add Experience</button>
            </form>
        </div>
    );
}

export default withAuthenticationRequired(AddExperience);