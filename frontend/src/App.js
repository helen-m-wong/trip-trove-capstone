import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Search from './pages/Search/Search.js';
import Signup from './pages/Signup/Signup';
import Header from './components/Header';
import Footer from './components/Footer';
import Trips from './pages/Trips/Trips.js';
import TripDetail from './pages/Trips/TripDetail.js';
import EditTrip from './pages/Trips/EditTrip.js';
import AddTrip from './pages/AddTrip/AddTrip.js';
import Experiences from './pages/Experiences/Experiences.js';
import ExperienceDetail from './pages/Experiences/ExperienceDetail.js';
import AddExperience from './pages/AddExperience/AddExperience.js';
import EditExperience from './pages/Experiences/EditExperience.js';
import FAQ from './pages/Faq/FAQ.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/:id" element={<TripDetail />} />
          <Route path="/trips/add" element={<AddTrip />} />
          <Route path="/trips/:id/edit" element={<EditTrip />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/experiences/:id" element={<ExperienceDetail />} />
          <Route path="/experiences/add" element={<AddExperience />} />
          <Route path="/experiences/:id/edit" element={<EditExperience />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
