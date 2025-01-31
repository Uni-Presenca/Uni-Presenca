import React, { useState, useEffect } from 'react';
import { QrCode, Upload, ArrowLeft, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const RegistrarPresenca = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'scan' | 'upload'>('scan');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string>('');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          setLocationError('Não foi possível obter sua localização');
        }
      );
    } else {
      setLocationError('Geolocalização não suportada pelo navegador');
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Registrar Presença
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            <button
              onClick={() => setActiveTab('scan')}
              className={`flex-1 px-6 py-4 text-sm font-medium text-center border-b-2 ${
                activeTab === 'scan'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <QrCode size={20} />
                <span>Scanear QR Code</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 px-6 py-4 text-sm font-medium text-center border-b-2 ${
                activeTab === 'upload'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Upload size={20} />
                <span>Importar QR Code</span>
              </div>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Location Display with Map */}
          <div className="mb-6">
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <MapPin size={16} className="text-primary-600 dark:text-primary-400" />
                {location ? (
                  <span>Localização atual: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</span>
                ) : (
                  <span>{locationError || 'Obtendo localização...'}</span>
                )}
              </div>
              
              {location && (
                <div className="h-48 rounded-lg overflow-hidden shadow-inner">
                  <MapContainer
                    center={[location.latitude, location.longitude]}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                    attributionControl={false}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[location.latitude, location.longitude]}>
                      <Popup>
                        Sua localização atual
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              )}
            </div>
          </div>

          {activeTab === 'scan' ? (
            <div className="text-center space-y-4">
              <div className="w-full max-w-md mx-auto aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <QrCode size={64} className="text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Posicione o QR Code da aula em frente à câmera para registrar sua presença
              </p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-full max-w-md mx-auto p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                <div className="space-y-4">
                  <Upload size={48} className="mx-auto text-gray-400 dark:text-gray-500" />
                  <div>
                    <label
                      htmlFor="qr-upload"
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-md cursor-pointer inline-block transition-colors"
                    >
                      Selecionar Arquivo
                    </label>
                    <input
                      type="file"
                      id="qr-upload"
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Arraste uma imagem do QR Code ou clique para selecionar
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrarPresenca;