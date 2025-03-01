import React from 'react';
import Home from './views/Home.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Actualiza los imports
import ProductDetail from './views/ProductDetail.jsx'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;