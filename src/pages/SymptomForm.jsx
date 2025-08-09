import { useState } from "react";
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
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    bloodPressure: "",
    pulseRate: "",
  });
  const [report, setReport] = useState(null); // State to store the AI report

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


  const handleSubmit = async () => {
    // Check for required fields before submitting
    if (!patientDetails.name || !patientDetails.age) {
      alert("Please fill in your name and age.");
      return;
    }

    const formData = {
      name: patientDetails.name,
      age: patientDetails.age,
      bloodPressure: patientDetails.bloodPressure, // Send the new field
      pulseRate: patientDetails.pulseRate, // Send the new field
      selectedSymptoms: symptoms
        .filter((s) => selectedSymptoms.includes(s.id))
        .map((s) => ({ id: s.id, name: s.name, category: s.category })),
    };

    console.log("Submitting data to backend:", formData);

    try {
      const response = await fetch("http://localhost:3001/api/reports", {
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
      // You'll now have a full AI report from the backend to display
      setReport(result.report);
      alert("Your symptom assessment has been submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("There was an error submitting your data. Please try again.");
    }
  };

  // Conditionally render the report or the form
  if (report) {
    return <ReportDisplay reportData={report} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-4 rounded-full bg-sky-100 flex items-center justify-center">
            <Stethoscope className="w-8 h-8 text-sky-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Symptom Assessment
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sky-600">
          Please select all symptoms you are currently experiencing. This
          information will help healthcare providers better understand your
          condition.
        </p>
      </div>

      {/* Patient Details */}
      <Card className="border border-black/10 bg-white shadow-sm rounded-2xl">
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
                <User className="w-4 h-4 mr-2 text-sky-500" />
                Full Name
              </Label>
              <Input
                id="name"
                value={patientDetails.name}
                onChange={handlePatientDetailsChange}
                placeholder="John Doe"
                className="focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="age" className="flex items-center text-gray-700">
                <TrendingUp className="w-4 h-4 mr-2 text-sky-500" />
                Age
              </Label>
              <Input
                id="age"
                type="number"
                value={patientDetails.age}
                onChange={handlePatientDetailsChange}
                placeholder="30"
                className="focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="bloodPressure"
                className="flex items-center text-gray-700"
              >
                <Heart className="w-4 h-4 mr-2 text-sky-500" />
                Blood Pressure (mmHg)
              </Label>
              <Input
                id="bloodPressure"
                value={patientDetails.bloodPressure}
                onChange={handlePatientDetailsChange}
                placeholder="120/80"
                className="focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="pulseRate"
                className="flex items-center text-gray-700"
              >
                <Activity className="w-4 h-4 mr-2 text-sky-500" />
                Pulse Rate (bpm)
              </Label>
              <Input
                id="pulseRate"
                type="number"
                value={patientDetails.pulseRate}
                onChange={handlePatientDetailsChange}
                placeholder="75"
                className="focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card className="border border-black/10 bg-white shadow-sm rounded-2xl">
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
                    ? "bg-sky-500 text-white hover:bg-sky-600"
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
        <Card className="border-primary/20 bg-primary-light/30 transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <Badge variant="secondary" className="px-2 py-1">
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
                    className="flex items-center gap-1 px-3 py-1"
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
      <Card className="border border-black/10 bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-foreground">
            Select Your Symptoms
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Check all symptoms that apply to your current condition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            layout
            className="grid grid-cols-2 gap-4 transition-all duration-300"
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
                        ? "border-sky-500 bg-sky-100 shadow-sky-200 shadow-md"
                        : "border-black/10 bg-white hover:border-sky-300 hover:bg-sky-50"
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
                    className="data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500 data-[state=checked]:text-white"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <div className="text-blue-600">{symptom.icon}</div>
                    <label
                      htmlFor={symptom.id}
                      className="font-medium text-foreground cursor-pointer flex-1"
                    >
                      {symptom.name}
                    </label>
                    <Badge variant="outline" className="text-xs">
                      {symptom.category}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <Button
          onClick={handleSubmit}
          disabled={selectedSymptoms.length === 0}
          size="lg"
          className="px-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover: shadow-lg transition-all duration-200 bg-sky-500 text-white hover:bg-sky-600 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 rounded-lg hover:cursor-pointer  hover:shadow-lg "
        >
          Submit Symptoms Assessment
        </Button>
      </div>
    </div>
  );
};

export default SymptomForm;
