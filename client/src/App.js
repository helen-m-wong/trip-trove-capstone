import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import DestinationList from './pages/Destinations/DestinationList';
import TourList from './pages/Tours/TourList';
import TourDetails from './pages/TourDetails/TourDetails';
import Signup from './pages/Signup/Signup';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<DestinationList />} />
        <Route path="/tours" element={<TourList />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;