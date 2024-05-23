import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function AddExperience() {
    const [experienceName, setExperienceName] = useState('');
    const [experienceDescription, setExperienceDescription] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    const convertToBase64 = (e) => {
        console.log(e);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setImage(reader.result); // Preview image
        };
        reader.onerror = (error) => {
            console.log("Error: ", error);
        };
    };

    const addExperience = async () => {
        try {
            const res = await fetch('/experiences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ExperienceName: experienceName,
                    ExperienceDescription: experienceDescription,
                    Image: image // modify this when implementing backend
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
            <form onSubmit={(e) => {e.preventDefault(); addExperience();}}>
                <label htmlFor="experienceName" className="required">
                    <b>Experience Name: </b>
                    <input
                        id="experienceName"
                        type="text"
                        value={experienceName}
                        onChange={(e) => setExperienceName(e.target.value)}
                        required
                    input/>
                </label>
                <br />
                <label>
                    <b>Experience Description: </b>
                    <input
                        id="experienceDescription"
                        type="text"
                        value={experienceDescription}
                        onChange={(e) => setExperienceDescription(e.target.value)}
                    />
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
                {image && <img width={100} height={100} src={image} alt="preview" />}
                <br />
                <button type="submit" id="submit">Add Experience</button>
            </form>
        </div>
    );
}

export default AddExperience;
