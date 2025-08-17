import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChoicePage from "./pages/ChoicePage";
import VocalInputPage from "./pages/VocalInputPage";
import SymptomForm from "./pages/SymptomForm";
import Chatbot from "./pages/Chatbot";
import LandingPage from "./pages/landingPage.jsx";
import Yoga from "./pages/Yoga";
import DietGeneration from "./pages/DietGeneration";
import Gym from "./pages/Gym";
import DietPlanDisplay from "./pages/DietPlanDisplay";
import YogaPractice from "./pages/YogaPractice.jsx"; // Importing the YogaPractice component




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/choicePage" element={<ChoicePage />} />
        <Route path="/vocal-input" element={<VocalInputPage />} />
        <Route path="/type-input" element={<SymptomForm />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/dietDisplay" element={<DietPlanDisplay/>} />
        <Route path="/Yoga" element={<Yoga/>} />
        <Route path="/DietGeneration" element={<DietGeneration />} />
        <Route path="/Gym" element={<Gym/>} />
        <Route path="/YogaPractice" element={<YogaPractice />} />
      </Routes>
    </BrowserRouter>
  );
}
