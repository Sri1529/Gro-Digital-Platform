import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import ToastContainer from "./Components/ToastContainer";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";

function App() {
  return (
    <>
      <ToastContainer position="top-right" />
      <Routes>
         <Route 
           path="/" 
           element={
             <PublicRoute>
               <Signup />
             </PublicRoute>
           } 
         />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
         <Route 
           path="/dashboard" 
           element={
             <ProtectedRoute>
               <Dashboard />
             </ProtectedRoute>
           } 
         />
         {/* Catch all route - redirect to appropriate page based on auth status */}
         <Route 
           path="*" 
           element={<Navigate to="/" replace />} 
         />
      </Routes>
    </>
  );
}

export default App;
