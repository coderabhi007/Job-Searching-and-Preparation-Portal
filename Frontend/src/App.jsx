import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <Router>
      <ToastContainer /> 
      <Routes>
      <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
