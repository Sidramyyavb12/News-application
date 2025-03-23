import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import News from "./Component/News"; 
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const [progress, setProgress] = useState(0);

  return (
    <Router>
      <Navbar />
      <LoadingBar color="#f11946" progress={progress} />
      <Routes>
        <Route exact path="/" element={<News setprogress={setProgress} key="general" country="us" pageSize={8} category="general" />} />
        <Route exact path="/science" element={<News setprogress={setProgress} key="science" country="US" pageSize={8} category="science" />} />
        <Route exact path="/business" element={<News setprogress={setProgress} key="business" country="US" pageSize={8} category="business" />} />
        <Route exact path="/politics" element={<News setprogress={setProgress} key="politics" country="US" pageSize={8} category="politics" />} />
        <Route exact path="/sports" element={<News setprogress={setProgress} key="sports" country="US" pageSize={8} category="sports" />} />
        <Route exact path="/health" element={<News setprogress={setProgress} key="health" country="US" pageSize={8} category="health" />} />
        <Route exact path="/technology" element={<News setprogress={setProgress} key="technology" country="US" pageSize={8} category="technology" />} />
        <Route exact path="/education" element={<News setprogress={setProgress} key="education" country="US" pageSize={8} category="education" />} />
      </Routes>
    </Router>
  );
};

export default App;
