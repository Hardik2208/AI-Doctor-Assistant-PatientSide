import React, { useState } from 'react';
import axios from 'axios';

const DietGeneration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    weight: '',
    height: '',
    activityLevel: '',
    healthGoal: '',
    dietType: '',
  });
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSelect = (field, value) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  };

  const nextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  };


const handleGeneratePlan = async () => {
  setLoading(true);
  try {
    const userDietData = {
      name: 'User',
      age: formData.age,
      height: formData.height,
      weight: formData.weight,
      selectedDiet: [
        { name: formData.healthGoal, category: 'Health Goal' },
        { name: formData.dietType, category: 'Diet Type' },
        { name: formData.activityLevel, category: 'Activity Level' },
      ],
    };

    const response = await axios.post('https://ai-doctor-assistant-backend-ai-ml.onrender.com/api/generate-diet-plan', { userDietData });

    setDietPlan(response.data.dietPlan);
    setStep(4); // Move to the diet plan display step

  } catch (error) {
    console.error("Error generating diet plan:", error);
    alert("There was an error generating your diet plan. Please try again.");
    if (axios.isAxiosError(error)) {
        console.error('Axios Error Details:', error.response?.data || error.message);
    }
  } finally {
    setLoading(false);
  }
};

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Basic Information</h3>
            <p className="text-gray-500 mb-6">Tell us about yourself to calculate your nutritional needs</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="25" className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="70" className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                <input type="number" name="height" value={formData.height} onChange={handleInputChange} placeholder="175" className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <button onClick={nextStep} className="mt-8 bg-blue-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-600 transition-colors">Continue</button>
          </div>
        );
      case 2:
        return (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Activity Level</h3>
            <p className="text-gray-500 mb-6">How active are you on a typical day?</p>
            <div className="space-y-4">
              {['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extra Active'].map(level => (
                <div key={level} onClick={() => handleSelect('activityLevel', level)} className={`p-4 border rounded-lg cursor-pointer ${formData.activityLevel === level ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'}`}>
                  <p className="font-semibold text-gray-800">{level}</p>
                  <p className="text-sm text-gray-500">{
                    level === 'Sedentary' ? 'Little to no exercise' :
                    level === 'Lightly Active' ? 'Light exercise 1-3 days/week' :
                    level === 'Moderately Active' ? 'Moderate exercise 3-5 days/week' :
                    level === 'Very Active' ? 'Hard exercise 6-7 days/week' :
                    'Very hard exercise, physical job'
                  }</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={prevStep} className="text-blue-500 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors">Back</button>
              <button onClick={nextStep} className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-600 transition-colors">Continue</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Health Goal</h3>
            <p className="text-gray-500 mb-6">What's your primary fitness goal?</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {['Lose Weight', 'Maintain Weight', 'Gain Weight', 'Build Muscle'].map(goal => (
                <div key={goal} onClick={() => handleSelect('healthGoal', goal)} className={`p-6 border rounded-lg cursor-pointer text-center ${formData.healthGoal === goal ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'}`}>
                  <span className="text-3xl mb-2 inline-block">
                    {goal === 'Lose Weight' ? '📉' : goal === 'Maintain Weight' ? '⚖️' : goal === 'Gain Weight' ? '📈' : '🏋️‍♂️'}
                  </span>
                  <p className="font-semibold text-gray-800">{goal}</p>
                  <p className="text-sm text-gray-500 mt-1">{
                    goal === 'Lose Weight' ? 'Create a caloric deficit' :
                    goal === 'Maintain Weight' ? 'Balanced caloric intake' :
                    goal === 'Gain Weight' ? 'Caloric surplus for muscle' :
                    'High protein focus'
                  }</p>
                </div>
              ))}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Diet Type</h3>
            <p className="text-gray-500 mb-6">Choose your preferred eating style</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {['Balanced', 'Keto', 'Mediterranean', 'Vegetarian', 'Vegan', 'Paleo'].map(type => (
                <div key={type} onClick={() => handleSelect('dietType', type)} className={`p-6 border rounded-lg cursor-pointer text-center ${formData.dietType === type ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'}`}>
                  <span className="text-3xl mb-2 inline-block">
                    {type === 'Balanced' ? '🍎' : type === 'Keto' ? '🥑' : type === 'Mediterranean' ? '🫒' : type === 'Vegetarian' ? '🥦' : type === 'Vegan' ? '🌱' : '🥩'}
                  </span>
                  <p className="font-semibold text-gray-800">{type}</p>
                  <p className="text-sm text-gray-500 mt-1">{
                    type === 'Balanced' ? 'Well-rounded nutrition' :
                    type === 'Keto' ? 'Low carb, high fat' :
                    type === 'Mediterranean' ? 'Heart-healthy fats' :
                    type === 'Vegetarian' ? 'Plant-based nutrition' :
                    type === 'Vegan' ? '100% plant-based' :
                    'Whole foods focused'
                  }</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={prevStep} className="text-blue-500 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors">Back</button>
              <button
                onClick={handleGeneratePlan}
                disabled={loading || !formData.healthGoal || !formData.dietType}
                className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating...' : 'Generate My Diet Plan'}
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Your Personalized Diet Plan</h3>
            {/* Display the generated diet plan */}
            {loading ? (
              <div className="text-center text-gray-500">Generating your plan...</div>
            ) : dietPlan ? (
              <div className="whitespace-pre-wrap leading-relaxed text-gray-700">
                {dietPlan}
              </div>
            ) : (
              <div className="text-center text-red-500">Failed to load diet plan.</div>
            )}
            
            <div className="flex justify-between mt-8">
              <button onClick={() => setStep(1)} className="text-blue-500 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors">Create New Plan</button>
              {/* Add a download button functionality if desired */}
              <button className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-600 transition-colors">Download Plan</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const progress = (step / 4) * 100;

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-50 py-16 px-4 md:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center bg-green-500 text-white rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          Personalized Nutrition
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
          Diet Generator
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get a personalized nutrition plan tailored to your goals, preferences, and lifestyle
        </p>
        <div className="flex justify-center items-center space-x-8 text-gray-600 mt-8">
          <div className="flex items-center space-x-2">
            <span className="text-blue-500">🎯</span>
            <span>Goal-Oriented</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-500">🔬</span>
            <span>Science-Based</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-500">⚡</span>
            <span>Instant Results</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="mb-8">
          <div className="flex justify-between items-center text-sm font-medium text-gray-500 mb-2">
            <span>Diet Plan Creation</span>
            <span>Step {step} of 4</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        
        {renderStep()}
        
      </div>
    </div>
  );
};

export default DietGeneration;