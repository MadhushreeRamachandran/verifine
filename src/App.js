// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/signup"; 
import ProtectedRoute from "./components/ProtectedRoute";
import UploadPost from "./components/Upload";
import Verify from "./components/verify";
import Settings from "./components/Settings";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadPost />
          </ProtectedRoute>
        }
      />

      <Route
  path="/verify"
  element={
    <ProtectedRoute>
      <Verify />
    </ProtectedRoute>
  }
/>

 <Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings/>
    </ProtectedRoute>
  }

/>

 <Route
  path="/requests"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
}

export default App;
