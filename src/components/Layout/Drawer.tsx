import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  UserCheck,
  BarChart2,
  Settings,
  Menu,
  X,
  GraduationCap,
  Layers
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: BookOpen, label: 'Aulas', path: '/aulas' },
  { icon: Calendar, label: 'Calendário', path: '/calendario' },
  { icon: UserCheck, label: 'Presença', path: '/presenca' },
  { icon: BarChart2, label: 'Estatísticas', path: '/estatisticas' },
  { icon: Layers, label: 'Grade Curricular', path: '/grade-curricular' },
  { icon: Settings, label: 'Configurações', path: '/configuracoes' },
];

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-primary-600 text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 z-10 
        ${isOpen ? 'w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'} lg:sticky border-r border-gray-200 dark:border-gray-700`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center">
            {isOpen ? (
              <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">UniPresença</h1>
            ) : (
              <GraduationCap className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            )}
          </div>

          <nav className="flex-1 py-4 px-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors duration-150
                  ${isActive 
                    ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-primary-600 dark:hover:text-primary-400'
                  }`
                }
              >
                <item.icon size={24} />
                {isOpen && <span className="ml-4">{item.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Drawer;