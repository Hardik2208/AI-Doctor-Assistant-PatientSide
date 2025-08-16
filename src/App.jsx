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
import ExerciseDetail from "./pages/ExerciseDetails";
import YogaDetail from "./pages/YogaDetails";
import DietPlanDisplay from "./pages/DietPlanDisplay";




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
        <Route path="/exercise/:name" element={<ExerciseDetail/>} />
        <Route path="/yoga/:name" element={<YogaDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}
