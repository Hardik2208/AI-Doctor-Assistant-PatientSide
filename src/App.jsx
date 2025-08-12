// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChoicePage from './pages/ChoicePage';
import VocalInputPage from './pages/VocalInputPage';
import SymptomForm from './pages/SymptomForm';
import Chatbot from './pages/Chatbot';
import LandingPage from './pages/landingPage'; 
import Gym from './pages/Gym';
import ExerciseDetail from './pages/ExerciseDetails';
import DietGeneration from './pages/DietGeneration';
import Yoga from './pages/Yoga';

const exercisesData = [
    {
        name: "Push-ups",
        mainImage: "https://images.unsplash.com/photo-1623864456950-610db9f18731?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvJTIwcHVzaHVwcyUyMGV4ZXJjaXNlfGVufDB8fDB8fHww",
        description: "A fundamental bodyweight exercise that works the chest, shoulders, triceps, and core.",
        benefits: [
            "Increases upper body strength",
            "Improves core stability",
            "Requires no equipment"
        ],
        steps: [
            { thumbnail: "https://images.unsplash.com/photo-1623864456950-610db9f18731?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvJTIwcHVzaHVwcyUyMGV4ZXJjaXNlfGVufDB8fDB8fHww", fullImage: "https://images.unsplash.com/photo-1623864456950-610db9f18731?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvJTIwcHVzaHVwcyUyMGV4ZXJjaXNlfGVufDB8fDB8fHww" },
            { thumbnail: "https://images.unsplash.com/photo-1549476902-140b99133887?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHB1c2h1cCUyMGV4ZXJjaXNlfGVufDB8fDB8fHww", fullImage: "https://images.unsplash.com/photo-1549476902-140b99133887?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHB1c2h1cCUyMGV4ZXJjaXNlfGVufDB8fDB8fHww" },
            { thumbnail: "https://images.unsplash.com/photo-1534258925567-f703c1626f81?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHVzaHVwJTIwZXhlcmNpc2V8ZW58MHx8MHx8fDA%3D", fullImage: "https://images.unsplash.com/photo-1534258925567-f703c1626f81?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHVzaHVwJTIwZXhlcmNpc2V8ZW58MHx8MHx8fDA%3D" }
        ]
    },
    {
        name: "Squats",
        mainImage: "https://images.unsplash.com/photo-1579752003714-3c6c06a4b3d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNxdWF0cyUyMGV4ZXJjaXNlfGVufDB8fDB8fHww",
        description: "A full-body exercise that primarily strengthens the legs and glutes.",
        benefits: [
            "Builds lower body strength",
            "Improves mobility and balance",
            "Helps with calorie expenditure"
        ],
        steps: [
            { thumbnail: "https://images.unsplash.com/photo-1579752003714-3c6c06a4b3d7?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNxdWF0cyUyMGV4ZXJjaXNlfGVufDB8fDB8fHww", fullImage: "https://images.unsplash.com/photo-1579752003714-3c6c06a4b3d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNxdWF0cyUyMGV4ZXJjaXNlfGVufDB8fDB8fHww" },
            { thumbnail: "https://images.unsplash.com/photo-1530964179374-e3f9a7214713?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3F1YXRzJTIwZXhlcmNpc2V8ZW58MHx8MHx8fDA%3D", fullImage: "https://images.unsplash.com/photo-1530964179374-e3f9a7214713?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fHww" },
            { thumbnail: "https://images.unsplash.com/photo-1530514107521-b4ed47514300?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNxdWF0cyUyMGV4ZXJjaXNlfGVufDB8fDB8fHww", fullImage: "https://images.unsplash.com/photo-1530514107521-b4ed47514300?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNxdWF0cyUyMGV4ZXJjaXNlfGVufDB8fDB8fHww" }
        ]
    }
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/choicePage" element={<ChoicePage />} />
        <Route path="/vocal-input" element={<VocalInputPage />} />
        <Route path="/type-input" element={<SymptomForm />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/Yoga" element={<Yoga />} />
        <Route path="/DietGeneration" element={<DietGeneration />} />

        <Route path="/Gym" element={<Gym exercisesData={exercisesData} />} />
        <Route
          path="/exercise/:name"
          element={<ExerciseDetail exercises={exercisesData} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
