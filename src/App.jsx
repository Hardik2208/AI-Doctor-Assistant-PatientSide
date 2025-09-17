// src/App.jsx

import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./assets/component/Srolltotop.js";
import { supabase } from './supabaseClient.js'

// Core pages - loaded immediately for better initial load
import LandingPage from "./pages/landingPage.jsx";
import LoginForm from "./pages/Login.jsx";
import ChoicePage from "./pages/ChoicePage";
import VocalInputPage from "./pages/VocalInputPage";
import SymptomForm from "./pages/SymptomForm";
import Chatbot from "./pages/Chatbot";
import TestPage from "./pages/TestPage.jsx";

// Lazy load heavy feature pages
const Yoga = React.lazy(() => import("./pages/Yoga"));
const DietGeneration = React.lazy(() => import("./pages/DietGeneration"));
const Gym = React.lazy(() => import("./pages/Gym"));
const DietPlanDisplay = React.lazy(() => import("./pages/DietPlanDisplay"));
const YogaPractice = React.lazy(() => import("./pages/YogaPractice.jsx"));
const MentalHealth = React.lazy(() => import("./pages/MentalHealth.jsx"));
const Jumba = React.lazy(() => import("./pages/Jumba.jsx"));
const Meditation = React.lazy(() => import("./pages/Meditation.jsx"));
const WellnessJournerPage = React.lazy(() => import('./pages/WellnessJourneyPage.jsx'));
const CycleTracker = React.lazy(() => import('./pages/CycleTracker.jsx'));
const CommonIllness = React.lazy(() => import('./pages/CommonIllness.jsx'));

// Doctor & Medical pages - lazy load
const FindDoctor = React.lazy(() => import("./pages/FindDoctor.jsx"));
const DoctorDetails = React.lazy(() => import("./pages/DoctorDetails.jsx"));
const Fitness = React.lazy(() => import("./pages/Fitness.jsx"));
const SpecialisedDoctor = React.lazy(() => import("./pages/SpecialisedDoctor.jsx"));
const ChatRoom = React.lazy(() => import("./pages/ChatRoom.jsx"));
const Telemedicine = React.lazy(() => import("./pages/Telemedicine.jsx"));
const Clinics = React.lazy(() => import("./pages/ClinicsNew.jsx"));

// Video components - lazy load
const VideoCall = React.lazy(() => import("./components/VideoCall.jsx"));
const VideoCallSetup = React.lazy(() => import("./components/VideoCallSetup.jsx"));
const TelemedicineSetup = React.lazy(() => import("./components/TelemedicineSetup.jsx"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-lg text-gray-600">Loading...</span>
  </div>
);

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
      <Suspense fallback={<PageLoader />}>
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
          <Route path="/specialised-doctor" element={<SpecialisedDoctor />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/test" element={<TestPage />} />

          {/* Telemedicine and Video Call pages */}
          <Route path="/telemedicine" element={<Telemedicine />} />
          <Route path="/telemedicine-setup" element={<TelemedicineSetup />} />
          <Route path="/telemedicine-setup/:doctorId" element={<TelemedicineSetup />} />
          <Route path="/video-call" element={<VideoCall />} />
          <Route path="/video-call/:roomId" element={<VideoCall />} />
          <Route path="/video-call-setup" element={<VideoCallSetup />} />
          <Route path="/video-setup/:doctorId" element={<VideoCallSetup />} />

          {/* Login page */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/cycle-tracker" element={<CycleTracker />} />
          
          {/* Common Illnesses page route */}
          <Route path="/common-illnesses" element={<CommonIllness />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
