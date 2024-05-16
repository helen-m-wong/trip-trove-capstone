import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar.js';
import Home from './pages/Home.js';
import Trips from './pages/Trips.js';
import TripDetail from './pages/TripDetail.js';
import AddTrip from './pages/AddTrip.js';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
