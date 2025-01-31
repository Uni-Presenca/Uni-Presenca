import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Clock, BookOpen, X } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

type Event = {
  date: Date;
  title: string;
  type: string;
  time: string;
  professor: string;
  sala: string;
};

const Calendario = () => {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const events: Event[] = [
    { 
      date: new Date(), 
      title: 'Cálculo III', 
      type: 'class',
      time: '08:00 - 10:00',
      professor: 'Dr. Silva',
      sala: 'A-101'
    },
    { 
      date: new Date(), 
      title: 'Física II', 
      type: 'class',
      time: '10:00 - 12:00',
      professor: 'Dra. Santos',
      sala: 'B-203'
    },
    { 
      date: new Date(), 
      title: 'Programação Web', 
      type: 'class',
      time: '14:00 - 16:00',
      professor: 'Dr. Oliveira',
      sala: 'Lab-01'
    },
  ];

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    setShowModal(true);
  };

  const getDayEvents = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    ).sort((a, b) => a.time.localeCompare(b.time));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calendário</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="w-full border-0"
            tileClassName={({ date: tileDate }) => {
              const hasEvents = events.some(event => 
                event.date.toDateString() === tileDate.toDateString()
              );
              return hasEvents ? 'has-events' : '';
            }}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm h-[600px] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Eventos do Dia
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {date.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>

          <div className="space-y-4">
            {getDayEvents(date).map((event, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {event.title}
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {event.time}
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <p>Professor: {event.professor}</p>
                  <p>Sala: {event.sala}</p>
                </div>
              </div>
            ))}
            {getDayEvents(date).length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400">
                Nenhum evento para este dia
              </p>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Timeline do Dia
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {date.toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="relative space-y-6">
                {getDayEvents(date).map((event, index) => (
                  <div
                    key={index}
                    className="relative pl-8 pb-8 last:pb-0"
                  >
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary-600 dark:bg-primary-500" />
                    {index !== getDayEvents(date).length - 1 && (
                      <div className="absolute left-2 top-6 bottom-0 w-[1px] bg-gray-200 dark:bg-gray-700" />
                    )}
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {event.title}
                          </h3>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          {event.time}
                        </div>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <p>Professor: {event.professor}</p>
                        <p>Sala: {event.sala}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {getDayEvents(date).length === 0 && (
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Nenhum evento para este dia
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendario