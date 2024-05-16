import React, { Component } from 'react';
import './Experiences.css'; // Optional: For custom styles for this page

class Experiences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experiences: [],
    };

    this.API_URL = "http://localhost:3000/";
  }

  componentDidMount() {
    this.refreshExperiences();
  }

  async refreshExperiences() {
    try {
      const response = await fetch(this.API_URL + "api/test/GetExperiences");
      const data = await response.json();
      this.setState({ experiences: data });
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  }

  async addExperience(event) {
    event.preventDefault(); // Prevent the form from reloading the page
    const title = document.getElementById("title").value;
    const location = document.getElementById("location").value;
    const details = document.getElementById("details").value;

    const data = new FormData();
    data.append("title", title);
    data.append("location", location);
    data.append("details", details);

    try {
      const response = await fetch(this.API_URL + "api/test/AddExperiences", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      alert(result.message);
      this.refreshExperiences(); // Refresh the list after adding
    } catch (error) {
      console.error("Error adding experience:", error);
    }
  }

  async deleteExperience(id) {
    try {
      const response = await fetch(this.API_URL + "api/test/DeleteExperiences?id=" + id, {
        method: "DELETE",
      });

      const result = await response.json();
      alert(result.message);
      this.refreshExperiences(); // Refresh the list after deleting
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  }

  render() {
    const { experiences } = this.state;

    return (
      <div className="experiences-page">
        <header>
          <h1>Trip Planner - Experiences</h1>
        </header>

        <div className="form-container">
          <form onSubmit={(e) => this.addExperience(e)}>
            <h2>Add Your Experience</h2>
            <div className="input-box">
              <input id="title" type="text" placeholder="Title" required />
            </div>
            <div className="input-box">
              <input id="location" type="text" placeholder="Location" required />
            </div>
            <div className="input-box">
              <textarea id="details" placeholder="Details" required />
            </div>
            <button type="submit">Add Experience</button>
          </form>
        </div>

        <div className="experience-list">
          <h2>Experiences</h2>
          {experiences.map((experience) => (
            <div key={experience.id} className="experience-item">
              <p>{experience.details}</p>
              <button onClick={() => this.deleteExperience(experience.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Experiences;
