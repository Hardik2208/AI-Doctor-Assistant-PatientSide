import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./assets/component/Srolltotop.js";


import ChoicePage from "./pages/ChoicePage";
import VocalInputPage from "./pages/VocalInputPage";
import SymptomForm from "./pages/SymptomForm";
import Chatbot from "./pages/Chatbot";
import LandingPage from "./pages/landingPage.jsx";
import Yoga from "./pages/Yoga";
import DietGeneration from "./pages/DietGeneration";
import Gym from "./pages/Gym";
import DietPlanDisplay from "./pages/DietPlanDisplay";
import YogaPractice from "./pages/YogaPractice.jsx";
import MentalHealth from "./pages/MentalHealth.jsx";
import Jumba from "./pages/Jumba.jsx";
import Meditation from "./pages/Meditation.jsx";
import LoginForm from "./pages/Login.jsx";
import {supabase } from './supabaseClient.js'
import WellnessJournerPage from './pages/WellnessJourneyPage.jsx'

import FindDoctor from "./pages/FindDoctor.jsx";
import DoctorDetails from "./pages/DoctorDetails.jsx";  // ✅ ab import ho gaya
import { useState } from "react";
import { useEffect } from "react";


export default function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // ✅ Get user if already logged in
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
    });
  
    // ✅ Listen for login/logout
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
  
    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route path="/choicePage" element={<ChoicePage />} />
        <Route path="/vocal-input" element={<VocalInputPage />} />
        <Route path="/type-input" element={<SymptomForm />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/" element={<LandingPage user={user} />} />
        <Route path="/dietDisplay" element={<DietPlanDisplay />} />
        <Route path="/Yoga" element={<Yoga />} />
        <Route path="/DietGeneration" element={<DietGeneration />} />
        <Route path="/Gym" element={<Gym />} />
        <Route path="/YogaPractice" element={<YogaPractice />} />
        <Route path="/MentalHealth" element={<MentalHealth />} />
        <Route path="/Jumba" element={<Jumba />} />
        <Route path="/Meditation" element={<Meditation />} />
        <Route path="/WellnessJourneyPage" element={<WellnessJournerPage />} />

        {/* Doctor pages */}
        <Route path="/find-doctor" element={<FindDoctor />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} /> {/* ✅ new page */}

        {/* Login page */}
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}
