import React, { useState } from 'react';
import { Bell, LogOut, Sun, Moon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const TopBar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
      <div className="flex items-center">
        <span className="text-gray-500 dark:text-gray-400">Curso:</span>
        <span className="ml-2 font-medium text-gray-700 dark:text-gray-200">
          Ciência da Computação
        </span>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200">
          <Bell size={20} />
        </button>
        
        <div className="relative">
          <div className="flex items-center space-x-3">
            <div className="flex flex-col text-right">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                João Silva
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Aluno</span>
            </div>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            </button>
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
            >
              <LogOut size={20} />
            </button>
          </div>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Perfil do Aluno
                  </h3>
                  <button
                    onClick={() => setShowProfile(false)}
                    className="text-gray-400 hover:text-gray-500 dark:text-gray-300"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Matrícula</p>
                    <p className="font-medium text-gray-900 dark:text-white">2024001234</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white">joao.silva@universidade.edu</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Período</p>
                    <p className="font-medium text-gray-900 dark:text-white">4º Semestre</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar