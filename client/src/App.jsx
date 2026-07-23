import {  Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import UploadNotes from "./pages/UploadNotes";
import Flashcards from "./pages/Flashcards";
import MCQ from "./pages/mcq";

function App() {
  return (
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
       <Route path="/dashboard" element={
           <ProtectedRoute>
               <Dashboard />
           </ProtectedRoute> }/>
      <Route path="/upload" element={
           <ProtectedRoute>
               <UploadNotes />
           </ProtectedRoute>
          } />
      <Route path="/flashcards" element={<Flashcards />} />
      <Route path="/mcq" element={<MCQ />} />
      
    </Routes>
    
  );
}

export default App;