import React from 'react';
import JointTracker from './JointTracker';
import { Button } from '../assets/component/button';
import { Card, CardContent, CardHeader, CardTitle } from '../assets/component/card';
import { Badge } from '../assets/component/badge';

const GymPractice = ({ exercise, onEndPractice }) => {
  // Simple end practice - just closes without loader
  const handleSimpleEndPractice = () => {
    onEndPractice(); // Just close the practice
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="flex justify-between items-center w-full max-w-7xl mb-6">
        <h1 className="text-4xl font-bold text-gray-800">{exercise.title}</h1>
        {/* This button just closes practice - no loader */}
        <Button 
          onClick={handleSimpleEndPractice} 
          className="bg-gray-500 hover:bg-gray-600 text-white"
        >
          End Practice
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl">
        {/* Live Camera and Joint Tracking (Left Half) */}
        <div className="relative flex-1 bg-gray-800 rounded-xl overflow-hidden shadow-lg aspect-video min-h-[400px]">
          {/* JointTracker has its own "Check Results" button with loader */}
          <JointTracker pose={exercise} onEndPractice={onEndPractice} />
        </div>
        
        {/* Exercise Details and Instructions (Right Half) */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
          <Card className="shadow-none border-none">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-bold text-gray-800">
                Instructions for {exercise.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="default" className={`bg-yellow-100 text-yellow-700 font-semibold`}>
                  {exercise.difficulty}
                </Badge>
                <Badge variant="default" className="bg-blue-100 text-blue-700 font-semibold">
                  {exercise.reps} Reps
                </Badge>
                <Badge variant="default" className="bg-green-100 text-green-700 font-semibold">
                  {exercise.sets} Sets
                </Badge>
              </div>
              <p className="text-gray-600">{exercise.subtitle}</p>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Target Muscles:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {exercise.targetMuscles.map((muscle, index) => (
                    <li key={index}>{muscle}</li>
                  ))}
                </ul>
              </div>
              
              <p className="text-sm text-gray-500 italic mt-4">
                Follow the live joint tracker on the left to ensure proper form.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GymPractice;