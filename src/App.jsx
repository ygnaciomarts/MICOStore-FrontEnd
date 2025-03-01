import React from 'react';
import Home from './views/Home.jsx';
import './styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './views/ProductDetail.jsx'; 

function App() {
  return (
    <Router basename="/mico/dist">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;