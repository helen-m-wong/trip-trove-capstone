import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './pages/Home.css';
import'./App.css';
import NavBar from './components/NavBar.js';
import Home from './pages/Home.js';
import Trips from './pages/Trips.js';
import TripDetail from './pages/TripDetail.js';
import AddTrip from './pages/AddTrip.js';
import Experiences from './pages/Experiences.js';
import ExperienceDetail from './pages/ExperienceDetail.js';
import AddExperience from './pages/AddExperience.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/:id" element={<TripDetail />} />
          <Route path="/trips/add" element={<AddTrip />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/experiences/:id" element={<ExperienceDetail />} />
          <Route path="/experiences/add" element={<AddExperience />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
