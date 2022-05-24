import React from "react";
import { Routes, Route } from "react-router-dom";
import Appoimentsapi from "./pages/Appoimentsapi";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aa" element={<Appoimentsapi />} />
      </Routes>
    </>
  );
};

export default App;
