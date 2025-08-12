import React from 'react';
import { useParams, Link } from 'react-router-dom';

const YogaDetail = ({ yogaPoses }) => {
    const { name } = useParams();
    const pose = yogaPoses.find(
        p => p.name.toLowerCase().replace(/\s/g, '-') === name
    );

    if (!pose) {
        return <div>Yoga pose not found!</div>;
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto my-8">
            <Link to="/Yoga" className="text-blue-500 hover:underline mb-4 inline-block">
                &larr; Back to Yoga Poses
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{pose.name}</h1>
            <p className="text-lg text-gray-700 mb-6">{pose.description}</p>
            <img src={pose.mainImage} alt={pose.name} className="w-full h-80 object-cover rounded-lg mb-6 shadow-md" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Benefits</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6">
                {pose.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                ))}
            </ul>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Steps to Perform</h2>
            <div className="space-y-8">
                {pose.steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-6">
                        <div className="flex-shrink-0 w-40 h-40 rounded-lg overflow-hidden border border-gray-200">
                            <img src={step.fullImage} alt={`Step ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-xl font-medium text-gray-800">Step {index + 1}</h3>
                            <p className="mt-2 text-gray-600">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YogaDetail;
