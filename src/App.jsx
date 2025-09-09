// src/App.jsx

import React, { useState, useEffect } from "react"; 
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
import { supabase } from './supabaseClient.js'
import WellnessJournerPage from './pages/WellnessJourneyPage.jsx'
import CycleTracker from './pages/CycleTracker.jsx';


import FindDoctor from "./pages/FindDoctor.jsx";
import DoctorDetails from "./pages/DoctorDetails.jsx";
import Fitness from "./pages/Fitness.jsx"; 
import SpecialisedDoctor from "./pages/SpecialisedDoctor.jsx";  // ✅ New import
import ChatRoom from "./pages/ChatRoom.jsx";
import VideoCall from "./components/VideoCall.jsx";
import VideoCallSetup from "./components/VideoCallSetup.jsx";
import Telemedicine from "./pages/Telemedicine.jsx";
import TelemedicineSetup from "./components/TelemedicineSetup.jsx";
import Clinics from "./pages/Clinics.jsx";  // ✅ New import for clinics


export default function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
    });
    
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
        {/* 1-to-1 Chat route */}
<Route path="/chat/:roomId" element={<ChatRoom />} />


        {/* Existing routes */}
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
        <Route path="/Zumba" element={<Jumba />} />
        <Route path="/Meditation" element={<Meditation />} />
        <Route path="/WellnessJourneyPage" element={<WellnessJournerPage />} />

        {/* New Fitness page route */}
        <Route path="/fitness" element={<Fitness user={user} />} />
        
        {/* Doctor pages */}
        <Route path="/find-doctor" element={<FindDoctor />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route path="/specialised-doctor" element={<SpecialisedDoctor />} /> {/* ✅ New route */}
        <Route path="/clinics" element={<Clinics />} /> {/* ✅ New route for clinics */}

        {/* Telemedicine */}
        <Route path="/telemedicine" element={<Telemedicine />} />
        <Route path="/telemedicine-setup/:doctorId" element={<TelemedicineSetup />} />

        {/* Video Call Routes */}
        <Route path="/video-setup/:doctorId" element={<VideoCallSetup />} />
        <Route path="/video-call/:roomId" element={<VideoCall />} />

        {/* Login page */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/cycle-tracker" element={<CycleTracker />} />

      </Routes>
    </BrowserRouter>
  );
}
