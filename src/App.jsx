import { useState } from "react";
import SymptomForm from "../src/pages/SymptomForm";

export default function App() {
  return (
    <div className="min-h-screen bg-clinical-gray/10 flex items-center justify-center p-4">
      <SymptomForm />
    </div>
  );
}