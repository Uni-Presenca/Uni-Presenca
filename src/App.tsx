import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/Layout/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Aulas from './pages/Aulas';
import Calendario from './pages/Calendario';
import Presenca from './pages/Presenca';
import Estatisticas from './pages/Estatisticas';
import Configuracoes from './pages/Configuracoes';
import RegistrarPresenca from './pages/RegistrarPresenca';
import GradeCurricular from './pages/GradeCurricular';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="aulas" element={<Aulas />} />
              <Route path="calendario" element={<Calendario />} />
              <Route path="presenca" element={<Presenca />} />
              <Route path="estatisticas" element={<Estatisticas />} />
              <Route path="configuracoes" element={<Configuracoes />} />
              <Route path="registrar-presenca" element={<RegistrarPresenca />} />
              <Route path="grade-curricular" element={<GradeCurricular />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App