import React, { useState } from 'react';
import { BookOpen, X, Filter, Clock, MapPin, User } from 'lucide-react';

const Aulas = () => {
  const [selectedDisciplina, setSelectedDisciplina] = useState<string>('Todas');
  const [showModal, setShowModal] = useState(false);
  const [selectedAula, setSelectedAula] = useState<any>(null);

  const disciplinas = [
    'Todas',
    'Cálculo III',
    'Física II',
    'Programação Web',
  ];

  const aulas = [
    {
      id: 1,
      nome: 'Cálculo III',
      professor: 'Dr. Silva',
      horario: '08:00 - 10:00',
      sala: 'A-101',
      conteudo: 'Derivadas Parciais',
      material: 'Capítulo 5 do livro',
      presenca: '90%',
      proximas: [
        { data: '25/03', tema: 'Integrais Múltiplas' },
        { data: '01/04', tema: 'Teorema de Green' },
      ]
    },
    {
      id: 2,
      nome: 'Física II',
      professor: 'Dra. Santos',
      horario: '10:00 - 12:00',
      sala: 'B-203',
      conteudo: 'Eletromagnetismo',
      material: 'Slides da aula',
      presenca: '85%',
      proximas: [
        { data: '26/03', tema: 'Lei de Gauss' },
        { data: '02/04', tema: 'Campo Elétrico' },
      ]
    },
    {
      id: 3,
      nome: 'Programação Web',
      professor: 'Dr. Oliveira',
      horario: '14:00 - 16:00',
      sala: 'Lab-01',
      conteudo: 'React Hooks',
      material: 'Repositório no GitHub',
      presenca: '95%',
      proximas: [
        { data: '27/03', tema: 'Context API' },
        { data: '03/04', tema: 'Redux' },
      ]
    },
  ];

  const filteredAulas = selectedDisciplina === 'Todas' 
    ? aulas 
    : aulas.filter(aula => aula.nome === selectedDisciplina);

  const openModal = (aula: any) => {
    setSelectedAula(aula);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Aulas</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={selectedDisciplina}
              onChange={(e) => setSelectedDisciplina(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {disciplinas.map((disc) => (
                <option key={disc} value={disc}>{disc}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAulas.map((aula) => (
          <div
            key={aula.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {aula.nome}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                  {aula.presenca}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <User className="h-4 w-4 mr-2" />
                  {aula.professor}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Clock className="h-4 w-4 mr-2" />
                  {aula.horario}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <MapPin className="h-4 w-4 mr-2" />
                  {aula.sala}
                </div>
              </div>

              <button
                onClick={() => openModal(aula)}
                className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-md transition-colors"
              >
                Ver Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedAula && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedAula.nome}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {selectedAula.professor}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Informações da Aula
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{selectedAula.horario}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{selectedAula.sala}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Conteúdo
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{selectedAula.conteudo}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Material de Apoio
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{selectedAula.material}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Próximas Aulas
                </h3>
                <div className="space-y-2">
                  {selectedAula.proximas.map((prox: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <span className="text-gray-900 dark:text-white font-medium">
                        {prox.tema}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {prox.data}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Aulas;