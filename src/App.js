import React, { useState } from "react";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import Alert from "./components/Alert";

function App() {
  const [mode,setMode] = useState('light');
  const[alert,setAlert] = useState(null);
  const toggleMode = () =>{
    if(mode=='light'){
      setMode("dark");
      document.body.style.backgroundColor="#49484a";
      document.body.style.color="white";
      showAlert("Dark mode has been Enabled","success");
    }
    else{
      setMode('light');
      document.body.style.backgroundColor="white";
      document.body.style.color="black";
      showAlert("Light mode has been Enabled","success");
    }
  }
  
  const showAlert = (message,type)=>{
    setAlert({
      msg:message,
      type:type
  })
  setTimeout(()=>{
    setAlert(null);
  },1500)
  }
  return (
    <>
      <Navbar title="Text Analyzer" mode={mode} toggleMode = {toggleMode} />
      <Alert alert={alert}/>
      <div className="container">
         <TextForm showAlert={showAlert} heading = "Enter Text To Analyze" />
  {/*<About/>*/}
      </div> 
    </>
  );
}

export default App;