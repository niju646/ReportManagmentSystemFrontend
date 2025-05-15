



//2
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import AddTeacher from "./components/AddTeacher";
import Teachermanagment from "./components/TeacherManagement";
import { Toaster } from "react-hot-toast";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false}  toastOptions={{style:{background:'#333',color:'#fff'}}}/>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-teacher"
            element={
              <ProtectedRoute>
                <AddTeacher />
              </ProtectedRoute>
            }
          />

{/* add teacher */}
          <Route
            path="/teachermanagment"
            element={
              <ProtectedRoute>
                <Teachermanagment />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;