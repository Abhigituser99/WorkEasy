// src/components/layout/Body.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../../pages/SignIn";


const Body = () => {
  return (

    <div className="flex flex-col items-center justify-center min-h-screen">
         <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* add more routes as you build new pages */}
        </Routes>
        </div>
      
  );
};

export default Body;
