// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChoicePage from './pages/ChoicePage';
import VocalInputPage from './pages/VocalInputPage';
import SymptomForm from './pages/SymptomForm';
import Chatbot from './pages/Chatbot';
import LandingPage from './pages/landingPage'; // यहां import कर लिया

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/choicePage" element={<ChoicePage />} />
        <Route path="/vocal-input" element={<VocalInputPage />} />
        <Route path="/type-input" element={<SymptomForm />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/" element={<LandingPage />} /> {/* नया route */}
        {/* <Route path="/" element={<landingPage/>} ></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
