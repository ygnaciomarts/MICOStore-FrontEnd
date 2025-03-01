import React from 'react';
import Home from './views/Home.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './views/ProductDetail.jsx'; 

const App = () => {
  return (
    <BrowserRouter basename="/mico/dist">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;