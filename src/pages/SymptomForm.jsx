import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../assets/component/card";
import { Checkbox } from "../assets/component/checkbox";
import { Button } from "../assets/component/button";
import { Badge } from "../assets/component/badge";
import { AnimatePresence, motion } from "framer-motion";
import { symptoms } from "./SymptomeData";
import { Label } from "../assets/component/lable";
import { Input } from "../assets/component/input";
import { Stethoscope, User, TrendingUp, Heart, Activity } from "lucide-react";
import ReportDisplay from "./ReportDisplay";

const SymptomForm = () => {
  const [step, setStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    bloodPressure: "",
    pulseRate: "",
  });
  const [report, setReport] = useState(null);

  const categories = [
    "All",
    ...Array.from(new Set(symptoms.map((s) => s.category))),
  ];

  const filteredSymptoms =
    selectedCategory === "All"
      ? symptoms
      : symptoms.filter((s) => s.category === selectedCategory);

  const handleSymptomChange = (symptomId, checked) => {
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter((id) => id !== symptomId));
    }
  };

  const handlePatientDetailsChange = (e) => {
    const { id, value } = e.target;
    setPatientDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleStep1Submit = () => {
    if (!patientDetails.name || !patientDetails.age) {
      alert("Please fill in your name and age.");
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = async () => {
    if (selectedSymptoms.length === 0) {
      alert("Please select at least one symptom.");
      return;
    }

    const formData = {
      name: patientDetails.name,
      age: patientDetails.age,
      bloodPressure: patientDetails.bloodPressure,
      pulseRate: patientDetails.pulseRate,
      selectedSymptoms: symptoms
        .filter((s) => selectedSymptoms.includes(s.id))
        .map((s) => ({ id: s.id, name: s.name, category: s.category })),
    };

    console.log("Submitting data to backend:", formData);

    try {
      const response = await fetch("https://ai-doctor-assistant-backend-ai-ml.onrender.com/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      setReport(result.report);
      alert("Your symptom assessment has been submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("There was an error submitting your data. Please try again.");
    }
  };

  if (report) {
    return <ReportDisplay reportData={report} />;
  }

  const renderStep = () => {
    if (step === 1) {
      return (
        <Card className="border border-gray-200 bg-white shadow-sm rounded-3xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Patient Details
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Please provide your personal information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="name" className="flex items-center text-gray-700">
                  <User className="w-4 h-4 mr-2 text-blue-500" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={patientDetails.name}
                  onChange={handlePatientDetailsChange}
                  placeholder="John Doe"
                  className="focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="age" className="flex items-center text-gray-700">
                  <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={patientDetails.age}
                  onChange={handlePatientDetailsChange}
                  placeholder="30"
                  className="focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="bloodPressure"
                  className="flex items-center text-gray-700"
                >
                  <Heart className="w-4 h-4 mr-2 text-blue-500" />
                  Blood Pressure (mmHg)
                </Label>
                <Input
                  id="bloodPressure"
                  value={patientDetails.bloodPressure}
                  onChange={handlePatientDetailsChange}
                  placeholder="120/80"
                  className="focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="pulseRate"
                  className="flex items-center text-gray-700"
                >
                  <Activity className="w-4 h-4 mr-2 text-blue-500" />
                  Pulse Rate (bpm)
                </Label>
                <Input
                  id="pulseRate"
                  type="number"
                  value={patientDetails.pulseRate}
                  onChange={handlePatientDetailsChange}
                  placeholder="75"
                  className="focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                />
              </div>
            </div>
            <div className="flex justify-end pt-6">
              <Button
                onClick={handleStep1Submit}
                size="lg"
                className="px-8 py-3 text-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded-full"
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    } else if (step === 2) {
      return (
        <>
          {/* Category Filter */}
          <Card className="border border-gray-200 bg-white shadow-sm rounded-3xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Filter by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 hover:cursor-pointer">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`transition-all duration-200 rounded-full hover:cursor-pointer ${
                      selectedCategory === category
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Symptoms Summary */}
          {selectedSymptoms.length > 0 && (
            <Card className="border border-blue-200 bg-blue-50 rounded-3xl transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Badge variant="secondary" className="px-2 py-1 bg-blue-500 text-white">
                    {selectedSymptoms.length}
                  </Badge>
                  Selected Symptoms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {symptoms
                    .filter((s) => selectedSymptoms.includes(s.id))
                    .map((symptom) => (
                      <Badge
                        key={symptom.id}
                        variant="default"
                        className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800"
                      >
                        {symptom.icon}
                        {symptom.name}
                      </Badge>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Symptoms Grid */}
          <Card className="border border-gray-200 bg-white shadow-sm rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">
                Select Your Symptoms
              </CardTitle>
              <CardDescription className="text-gray-600">
                Check all symptoms that apply to your current condition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300"
              >
                <AnimatePresence>
                  {filteredSymptoms.map((symptom) => (
                    <motion.div
                      key={symptom.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-center space-x-3 p-4 rounded-xl border cursor-pointer transition-all duration-200
                        ${
                          selectedSymptoms.includes(symptom.id)
                            ? "border-blue-500 bg-blue-50 shadow-blue-100 shadow-md"
                            : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      onClick={() =>
                        handleSymptomChange(
                          symptom.id,
                          !selectedSymptoms.includes(symptom.id)
                        )
                      }
                    >
                      <Checkbox
                        id={symptom.id}
                        checked={selectedSymptoms.includes(symptom.id)}
                        onCheckedChange={(checked) =>
                          handleSymptomChange(symptom.id, checked)
                        }
                        className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:text-white"
                      />
                      <div className="flex items-center gap-2 flex-1">
                        <div className="text-blue-600">{symptom.icon}</div>
                        <label
                          htmlFor={symptom.id}
                          className="font-medium text-gray-800 cursor-pointer flex-1"
                        >
                          {symptom.name}
                        </label>
                        <Badge variant="outline" className="text-xs hidden sm:block">
                          {symptom.category}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </CardContent>
          </Card>

          {/* Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              onClick={() => setStep(1)}
              size="lg"
              className="px-8 py-3 text-lg font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-full"
            >
              Back
            </Button>
            <Button
              onClick={handleStep2Submit}
              disabled={selectedSymptoms.length === 0}
              size="lg"
              className="px-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded-full"
            >
              Submit Symptoms Assessment
            </Button>
          </div>
        </>
      );
    }
  };

  const progress = (step / 2) * 100;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 sm:p-4 rounded-full bg-green-500 flex items-center justify-center">
            <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Symptom Assessment
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Please provide your personal information and select all symptoms you are currently experiencing.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center text-sm font-medium text-gray-500 mb-2">
          <span>Patient Info & Symptoms</span>
          <span>Step {step} of 2</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {renderStep()}
    </div>
  );
};

export default SymptomForm;