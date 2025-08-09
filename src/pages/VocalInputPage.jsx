import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../assets/component/card';
import { Label } from '../assets/component/lable';
import { Input } from '../assets/component/input';
import { Button } from '../assets/component/button';
import { Mic, User, TrendingUp, Heart, Activity, Thermometer } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const VocalInputPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    age: '',
    bloodPressure: '',
    temperature: '',
    symptoms: '',
  });
  const [step, setStep] = useState(0); // 0: Name, 1: Age, 2: BP, 3: Temp, 4: Symptoms
  const recognitionRef = useRef(null);
  const [prompt, setPrompt] = useState('');

  const prompts = [
    'What is your name?',
    'How old are you?',
    'What is your blood pressure?',
    'What is your body temperature?',
    'Please describe the symptoms you are experiencing.',
  ];

  const speak = (text, onEnd) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      if (onEnd) {
        utterance.onend = onEnd;
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  const startRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser does not support the Web Speech API. Please use Google Chrome.");
      return;
    }
    
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      processTranscript(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      // Automatically move to the next step after transcription ends
      if (step < prompts.length - 1) {
        setStep(step + 1);
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  useEffect(() => {
    // This effect runs on component mount and every time 'step' changes
    const currentPrompt = prompts[step];
    setPrompt(currentPrompt);
    // Speak the prompt, and when it's done, start listening for a response
    speak(currentPrompt, startRecognition);

    // Cleanup function to stop recognition if the component unmounts
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [step]);

  const processTranscript = (transcript) => {
    const newDetails = { ...patientDetails };
    
    switch (step) {
      case 0:
        newDetails.name = transcript.trim();
        break;
      case 1:
        const ageMatch = /(\d+)/.exec(transcript);
        if (ageMatch && ageMatch[1]) {
          newDetails.age = ageMatch[1];
        }
        break;
      case 2:
        const bpMatch = /(\d+)\s*(over)?\s*(\d+)?/i.exec(transcript);
        if (bpMatch && bpMatch[1]) {
          const systolic = bpMatch[1];
          const diastolic = bpMatch[3] || '80';
          newDetails.bloodPressure = `${systolic}/${diastolic}`;
        }
        break;
      case 3:
        const tempMatch = /(\d+(\.\d+)?)/.exec(transcript);
        if (tempMatch && tempMatch[1]) {
          newDetails.temperature = tempMatch[1];
        }
        break;
      case 4:
        newDetails.symptoms = transcript;
        break;
      default:
        break;
    }
    setPatientDetails(newDetails);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPatientDetails({ ...patientDetails, [id]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientDetails.name || !patientDetails.age || !patientDetails.symptoms) {
      alert("Please provide all required details and symptoms.");
      return;
    }
    
    console.log("Submitting:", patientDetails);
    alert("Voice input submitted successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="absolute top-4 left-4">
        <Link to="/">
          <Button>← Go Back</Button>
        </Link>
      </div>

      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Voice Symptom Assessment</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            {prompt}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <motion.button 
              className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl shadow-lg transition-all duration-300 ${isRecording ? 'bg-red-500' : 'bg-sky-500 hover:bg-sky-600'}`} 
              onClick={() => {}} // Remove the onClick functionality to prevent manual triggering
              animate={{ scale: isRecording ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Mic className={`w-12 h-12 ${isRecording ? 'animate-pulse' : ''}`} />
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="name" className="flex items-center"><User className="w-4 h-4 mr-2" />Full Name</Label>
                <Input id="name" value={patientDetails.name} onChange={handleInputChange} readOnly={step !== 0} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="age" className="flex items-center"><TrendingUp className="w-4 h-4 mr-2" />Age</Label>
                <Input id="age" type="number" value={patientDetails.age} onChange={handleInputChange} readOnly={step !== 1} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="bloodPressure" className="flex items-center"><Heart className="w-4 h-4 mr-2" />Blood Pressure</Label>
                <Input id="bloodPressure" value={patientDetails.bloodPressure} onChange={handleInputChange} readOnly={step !== 2} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="temperature" className="flex items-center"><Thermometer className="w-4 h-4 mr-2" />Temperature</Label>
                <Input id="temperature" value={patientDetails.temperature} onChange={handleInputChange} readOnly={step !== 3} />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="symptoms" className="flex items-center"><Activity className="w-4 h-4 mr-2" />Symptoms</Label>
              <textarea
                id="symptoms"
                className="w-full h-32 p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500"
                value={patientDetails.symptoms}
                onChange={handleInputChange}
                readOnly={step !== 4}
              />
            </div>
            
            <Button type="submit" className="w-full bg-sky-500 text-white font-semibold hover:bg-sky-600" disabled={!patientDetails.symptoms}>
              Submit Assessment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VocalInputPage;