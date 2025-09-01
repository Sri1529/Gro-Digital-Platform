import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import ToastContainer from "./Components/ToastContainer";


function App() {
  return (
    <>
      <ToastContainer position="top-right" />
      <Routes>
         <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
         <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
