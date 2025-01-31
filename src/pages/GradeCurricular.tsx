import React, { useState } from 'react';
import { BookOpen, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Disciplina {
  codigo: string;
  nome: string;
  creditos: number;
  status: 'concluida' | 'cursando' | 'pendente';
  prerequisitos: string[];
  cargaHoraria: number;
  semestre: number;
}

const GradeCurricular = () => {
  const [selectedSemestre, setSelectedSemestre] = useState<number | null>(null);

  const disciplinas: Disciplina[] = [
    // 1º Semestre
    {
      codigo: 'MAT101',
      nome: 'Cálculo I',
      creditos: 6,
      status: 'concluida',
      prerequisitos: [],
      cargaHoraria: 90,
      semestre: 1
    },
    {
      codigo: 'FIS101',
      nome: 'Física I',
      creditos: 4,
      status: 'concluida',
      prerequisitos: [],
      cargaHoraria: 60,
      semestre: 1
    },
    {
      codigo: 'PROG101',
      nome: 'Introdução à Programação',
      creditos: 4,
      status: 'concluida',
      prerequisitos: [],
      cargaHoraria: 60,
      semestre: 1
    },
    // 2º Semestre
    {
      codigo: 'MAT102',
      nome: 'Cálculo II',
      creditos: 6,
      status: 'concluida',
      prerequisitos: ['MAT101'],
      cargaHoraria: 90,
      semestre: 2
    },
    {
      codigo: 'FIS102',
      nome: 'Física II',
      creditos: 4,
      status: 'concluida',
      prerequisitos: ['FIS101'],
      cargaHoraria: 60,
      semestre: 2
    },
    {
      codigo: 'PROG102',
      nome: 'Estruturas de Dados',
      creditos: 4,
      status: 'concluida',
      prerequisitos: ['PROG101'],
      cargaHoraria: 60,
      semestre: 2
    },
    // 3º Semestre
    {
      codigo: 'MAT103',
      nome: 'Cálculo III',
      creditos: 6,
      status: 'cursando',
      prerequisitos: ['MAT102'],
      cargaHoraria: 90,
      semestre: 3
    },
    {
      codigo: 'FIS103',
      nome: 'Física III',
      creditos: 4,
      status: 'cursando',
      prerequisitos: ['FIS102'],
      cargaHoraria: 60,
      semestre: 3
    },
    {
      codigo: 'PROG103',
      nome: 'Programação Orientada a Objetos',
      creditos: 4,
      status: 'cursando',
      prerequisitos: ['PROG102'],
      cargaHoraria: 60,
      semestre: 3
    },
    // 4º Semestre
    {
      codigo: 'MAT104',
      nome: 'Cálculo Numérico',
      creditos: 4,
      status: 'pendente',
      prerequisitos: ['MAT103'],
      cargaHoraria: 60,
      semestre: 4
    },
    {
      codigo: 'PROG104',
      nome: 'Banco de Dados',
      creditos: 4,
      status: 'pendente',
      prerequisitos: ['PROG103'],
      cargaHoraria: 60,
      semestre: 4
    },
    {
      codigo: 'REDES101',
      nome: 'Redes de Computadores',
      creditos: 4,
      status: 'pendente',
      prerequisitos: ['PROG102'],
      cargaHoraria: 60,
      semestre: 4
    },
  ];

  const semestres = Array.from(new Set(disciplinas.map(d => d.semestre))).sort();

  const getStatusColor = (status: Disciplina['status']) => {
    switch (status) {
      case 'concluida':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cursando':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'pendente':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: Disciplina['status']) => {
    switch (status) {
      case 'concluida':
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'cursando':
        return <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'pendente':
        return <AlertCircle className="h-5 w-5 text-gray-400 dark:text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Grade Curricular
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
              <span className="text-gray-600 dark:text-gray-400">Concluída</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1" />
              <span className="text-gray-600 dark:text-gray-400">Cursando</span>
            </div>
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-1" />
              <span className="text-gray-600 dark:text-gray-400">Pendente</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Semestres */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Semestres
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {semestres.map((semestre) => (
              <button
                key={semestre}
                onClick={() => setSelectedSemestre(selectedSemestre === semestre ? null : semestre)}
                className={`p-4 rounded-lg border transition-colors ${
                  selectedSemestre === semestre
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/50'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {semestre}º Semestre
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {disciplinas.filter(d => d.semestre === semestre).length} disciplinas
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Disciplinas do Semestre Selecionado */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {selectedSemestre ? `Disciplinas do ${selectedSemestre}º Semestre` : 'Todas as Disciplinas'}
          </h2>
          <div className="space-y-4">
            {disciplinas
              .filter(d => !selectedSemestre || d.semestre === selectedSemestre)
              .map((disciplina) => (
                <div
                  key={disciplina.codigo}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {disciplina.nome}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Código: {disciplina.codigo}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(disciplina.status)}`}>
                        {disciplina.status.charAt(0).toUpperCase() + disciplina.status.slice(1)}
                      </span>
                      {getStatusIcon(disciplina.status)}
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Créditos</p>
                      <p className="font-medium text-gray-900 dark:text-white">{disciplina.creditos}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Carga Horária</p>
                      <p className="font-medium text-gray-900 dark:text-white">{disciplina.cargaHoraria}h</p>
                    </div>
                  </div>
                  {disciplina.prerequisitos.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Pré-requisitos</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {disciplina.prerequisitos.map(prereq => (
                          <span
                            key={prereq}
                            className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                          >
                            {prereq}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeCurricular;