// --- ExerciseDetail.jsx ---
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ExerciseDetail = ({ exercises }) => {
    const { name } = useParams();
    const exercise = exercises.find(ex => ex.name.toLowerCase().replace(/\s/g, '-') === name);

    if (!exercise) {
        return <div>Exercise not found!</div>;
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto my-8">
            <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Exercises</Link>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{exercise.name}</h1>
            <p className="text-lg text-gray-700 mb-6">{exercise.description}</p>
            
            <img 
                src={exercise.mainImage} 
                alt={exercise.name} 
                className="w-full h-80 object-cover rounded-lg mb-6 shadow-md" 
            />

            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Benefits</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6">
                {exercise.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                ))}
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Perform</h2>
            <div className="space-y-8">
                {exercise.steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-6">
                        <div className="flex-shrink-0 w-40 h-40 rounded-lg overflow-hidden border border-gray-200">
                            <img 
                                src={step.fullImage} 
                                alt={`Step ${index + 1}`} 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-medium text-gray-800">Step {index + 1}</h3>
                            {/* You would add a description for each step here */}
                            <p className="mt-2 text-gray-600">
                                This is a detailed description of how to perform step {index + 1} of the exercise.
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExerciseDetail;