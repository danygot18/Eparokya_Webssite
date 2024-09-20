import logo from './logo.svg';
import './App.css';
import { Home } from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import { Login } from './components/User/Login'
import { Register } from './components/User/Register'
import React, { useRef } from 'react'; 
import { AuthContext } from './components/Context/AuthContext';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact="true"/>
        <Route path="/login" element={<Login />} exact="true" />
        <Route path="/register" element={<Register  exact="true"/>} />
      </Routes>
    </Router>
  );
}

export default App;
