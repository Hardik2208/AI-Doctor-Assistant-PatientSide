// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChoicePage from './pages/ChoicePage';
import VocalInputPage from './pages/VocalInputPage';
import SymptomForm from './pages/SymptomForm'; // Import the SymptomForm page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChoicePage />} />
        <Route path="/vocal-input" element={<VocalInputPage />} />
        <Route path="/type-input" element={<SymptomForm />} /> {/* New route for the symptom form */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;