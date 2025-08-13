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

// ✅ Single yogaData definition
import treeMain from "./pages/tree-main.png";
import treeStep1 from "./pages/tree-step1.png";
import treeStep2 from "./pages/tree-step2.png";
import treeStep3 from "./pages/tree-step3.png";

import cobraMain from "./pages/cobra-main.png";
import cobraStep1 from "./pages/cobra-step1.png";
import cobraStep2 from "./pages/cobra-step2.png";
import cobraStep3 from "./pages/cobra-step3.png";

const yogaData = [
  {
    name: "Tree Pose (Vrikshasana)",
    mainImage: treeMain,
    description: "A balancing pose that improves focus, posture, and leg strength.",
    benefits: [
      "Improves balance and stability",
      "Strengthens legs and core",
      "Enhances concentration"
    ],
    steps: [
      { fullImage: treeStep1, description: "Stand tall and steady." },
      { fullImage: treeStep2, description: "Place one foot on the opposite thigh." },
      { fullImage: treeStep3, description: "Bring palms together overhead." }
    ]
  },
  {
    name: "Cobra Pose (Bhujangasana)",
    mainImage: cobraMain,
    description: "A gentle backbend that opens the chest and strengthens the spine.",
    benefits: [
      "Strengthens back muscles",
      "Improves spinal flexibility",
      "Opens chest and lungs"
    ],
    steps: [
      { fullImage: cobraStep1, description: "Lie face down with hands under shoulders." },
      { fullImage: cobraStep2, description: "Press into hands and lift chest." },
      { fullImage: cobraStep3, description: "Hold and breathe deeply." }
    ]
  }
];

// Sample gym data
// Sample gym data
const exercisesData = [
  {
    name: "Push Up",
    image: "/images/pushup.jpg",
    description: "An upper body exercise that primarily works the chest, shoulders, and triceps.",
    benefits: [
      "Strengthens upper body",
      "Improves core stability",
      "Enhances endurance"
    ],
    steps: [
      { image: "/images/pushup_step1.jpg", text: "Start in plank position." },
      { image: "/images/pushup_step2.jpg", text: "Lower your body until your chest nearly touches the floor." },
      { image: "/images/pushup_step3.jpg", text: "Push yourself back up to the starting position." }
    ]
  },
  {
    name: "Squat",
    image: "/images/squat.jpg",
    description: "A compound lower body exercise that targets the thighs, hips, and buttocks.",
    benefits: [
      "Builds lower body strength",
      "Improves mobility and balance",
      "Enhances core stability"
    ],
    steps: [
      { image: "/images/squat_step1.jpg", text: "Stand with feet shoulder-width apart." },
      { image: "/images/squat_step2.jpg", text: "Lower hips down and back as if sitting into a chair." },
      { image: "/images/squat_step3.jpg", text: "Push through heels to return to standing." }
    ]
  }
];


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
        <Route path="/Yoga" element={<Yoga yogaPoses={yogaData} />} />
        <Route path="/DietGeneration" element={<DietGeneration />} />
        <Route path="/Gym" element={<Gym exercisesData={exercisesData} />} />
        <Route path="/exercise/:name" element={<ExerciseDetail exercises={exercisesData} />} />
        <Route path="/yoga/:name" element={<YogaDetail yogaPoses={yogaData} />} />
      </Routes>
    </BrowserRouter>
  );
}
