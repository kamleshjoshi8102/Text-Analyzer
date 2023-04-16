import React from "react";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";


function App() {
  return (
    <>
      <Navbar title="Text Analyzer"/>
      <div className="container">
        <TextForm heading = "Enter Text To Analyze" />
      </div>
    </>
  );
}

export default App;