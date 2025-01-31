import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const Presenca = () => {
  const materias = [
    {
      nome: 'Cálculo III',
      registros: Array.from({ length: 30 }, (_, i) => ({
        data: new Date(2024, 2, i + 1),
        status: Math.random() > 0.2 ? 'presente' : 'falta',
        horario: '08:00'
      }))
    },
    {
      nome: 'Física II',
      registros: Array.from({ length: 30 }, (_, i) => ({
        data: new Date(2024, 2, i + 1),
        status: Math.random() > 0.2 ? 'presente' : 'falta',
        horario: '10:00'
      }))
    },
    {
      nome: 'Programação Web',
      registros: Array.from({ length: 30 }, (_, i) => ({
        data: new Date(2024, 2, i + 1),
        status: Math.random() > 0.2 ? 'presente' : 'falta',
        horario: '14:00'
      }))
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Registro de Presenças
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materias.map((materia) => (
          <div
            key={materia.nome}
            className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {materia.nome}
              </h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[400px] overflow-y-auto">
              {materia.registros.map((registro, index) => (
                <div
                  key={index}
                  className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <div className="flex items-center space-x-4">
                    <Calendar className="text-gray-400 dark:text-gray-500" size={20} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {registro.data.toLocaleDateString('pt-BR')}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock size={14} className="mr-1" />
                        {registro.horario}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${registro.status === 'presente' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                  >
                    {registro.status === 'presente' ? 'Presente' : 'Falta'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Presenca