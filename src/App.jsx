import React from 'react';
import HomeView from './views/Home.jsx';
import './styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './views/ProductDetails.jsx';
import LoginView from './views/Login.jsx';
import RegisterView from './views/Register.jsx';
import MainLayout from '../src/components/MainLayout.jsx';
import AdminUsers from './views/admin/Dashboard';
import AdminProducts from './views/admin/Products';
import useTokenValidation from './hooks/useTokenValidation.js';

function App() {
  useTokenValidation();

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/" element={<HomeView />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/admin/dashboard" element={<AdminUsers />} />
          <Route path="/admin/products" element={<AdminProducts />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;