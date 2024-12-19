import React from "react";
import Main from "./main/Main";
import "./App.css";
import Sidebar from "./sidebar/Sidebar";

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="app-container d-flex justify-content-between">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
};

export default App;
