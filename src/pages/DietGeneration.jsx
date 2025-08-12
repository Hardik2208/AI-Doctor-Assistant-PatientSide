import React from "react";
import Header from "../assets/component/Header.jsx";

function DietGeneration() {
  return (
    <div>
      <Header />
      <div className="mt-20"> {/* Add margin to push content down */}
        <h1 className="text-3xl font-bold p-4">Diet Generation Page</h1>
        {/* Your other page content will go here */}
      </div>
    </div>
  );
}

export default DietGeneration;
