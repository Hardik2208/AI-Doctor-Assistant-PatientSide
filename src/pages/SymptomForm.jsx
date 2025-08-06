import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../assets/component/card";
import { Checkbox } from "../assets/component/checkbox";
import { Button } from "../assets/component/button";
import { Badge } from "../assets/component/badge";
import { Stethoscope, Heart, Brain, Thermometer, Eye, Ear, X, Syringe, Clipboard, Scan } from "lucide-react";
import { symptoms } from "./SymptomeData";

const SymptomForm = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(symptoms.map(s => s.category)))];
  
  const filteredSymptoms = selectedCategory === "All"  
    ? symptoms  
    : symptoms.filter(s => s.category === selectedCategory);

  const handleSymptomChange = (symptomId, checked) => {
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
    }
  };

  const handleSubmit = () => {
    const selectedSymptomNames = symptoms
      .filter(s => selectedSymptoms.includes(s.id))
      .map(s => s.name);
    
    console.log("Selected symptoms:", selectedSymptomNames);
    alert("Symptoms submitted. See console for details.");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-primary-light">
            <Stethoscope className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Symptom Assessment</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Please select all symptoms you are currently experiencing.
        </p>
      </div>

      {/* Category Filter */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-foreground">Filter by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Symptoms Summary */}
      {selectedSymptoms.length > 0 && (
        <Card className="border-primary/20 bg-primary-light/30">
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
                .filter(s => selectedSymptoms.includes(s.id))
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
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-foreground">Select Your Symptoms</CardTitle>
          <CardDescription className="text-muted-foreground">
            Check all symptoms that apply to your current condition
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Changed grid layout to display 2 columns */}
          <div className="grid grid-cols-2 gap-4">
            {filteredSymptoms.map((symptom) => (
              <div
                key={symptom.id}
                className={`
                  flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
                  ${selectedSymptoms.includes(symptom.id)
                    ? 'border-medical-blue bg-medical-blue-light shadow-medical-blue-light/50 shadow-md' // Added blue shadow and light blue background
                    : 'border-border bg-background hover:border-medical-blue/30 hover:bg-medical-blue-light/20'
                  }
                `}
                onClick={() => handleSymptomChange(symptom.id, !selectedSymptoms.includes(symptom.id))}
              >
                <Checkbox
                  id={symptom.id}
                  checked={selectedSymptoms.includes(symptom.id)}
                  onCheckedChange={(checked) => handleSymptomChange(symptom.id, checked)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <div className="flex items-center gap-2 flex-1">
                  <div className="text-primary">
                    {symptom.icon}
                  </div>
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <Button 
          onClick={handleSubmit}
          disabled={selectedSymptoms.length === 0}
          size="lg"
          className="px-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Symptoms Assessment
        </Button>
      </div>
    </div>
  );
};

export default SymptomForm;