import React from 'react';
import HomeView from './views/Home.jsx';
import './styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './views/ProductDetail.jsx';
import LoginView from './views/Login.jsx';
import RegisterView from './views/Register.jsx';
import MainLayout from '../src/components/MainLayout.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/" element={<HomeView />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;