import React, { useState } from "react";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import Alert from "./components/Alert";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const removeBodyClasses = () => {
  document.body.classList.remove("bg-light");
  document.body.classList.remove("bg-dark");
  document.body.classList.remove("bg-warning");
  document.body.classList.remove("bg-succss");
  document.body.classList.remove("bg-danger");
};

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);
  const toggleMode = (cls) => {
    removeBodyClasses();
    // console.log(cls);
    // we are adding background class
    // if (cls != null) {
    //   document.body.classList.add("bg-" + cls);
    //   if (cls === "dark") {
    //     removeBodyClasses();
    //     setMode("dark");
    //     document.body.style.backgroundColor = "#49484a";
    //     document.body.style.color = "white";
    //     showAlert("Dark mode has been Enabled", "success");
    //   }
    //   if(cls==="light")
    //   {
    //     removeBodyClasses();
    //     setMode("light");
    //     document.body.style.backgroundColor = "white";
    //     document.body.style.color = "black";
    //     showAlert("Light mode has been Enabled", "success");
    //   }
    //   // console.log(cls);
    //   // showAlert(`${cls}  mode has been Enabled", "success"`);

    // }
    if (mode === "light" && cls == null) {
      setMode("dark");
      document.body.style.backgroundColor = "#49484a";
      document.body.style.color = "white";
      showAlert("Dark mode has been Enabled", "success");
    } else if (cls == null) {
      setMode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      showAlert("Light mode has been Enabled", "success");
    }
  };

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <Router>
        <Navbar title="Text Analyzer" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            <Route exact path="/about" element={<About />} />
            <Route
              exact
              path="/"
              element={
                <TextForm
                  showAlert={showAlert}
                  heading="Try TextUtils - Word Counter, Character Counter, Remove extra Spaces"
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
