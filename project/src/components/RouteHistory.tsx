import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, Truck, Package, Leaf, Calendar, Trash2 } from 'lucide-react';
import { RouteHistoryEntry } from '../types';

interface RouteHistoryProps {
  history: RouteHistoryEntry[];
  onClose: () => void;
  onLoadEntry: (entry: RouteHistoryEntry) => void;
  onClearHistory: () => void;
}

const RouteHistory: React.FC<RouteHistoryProps> = ({ 
  history, 
  onClose, 
  onLoadEntry, 
  onClearHistory 
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getVehicleIcon = (vehicleType: string) => {
    switch (vehicleType) {
      case 'electric': return '⚡';
      case 'hybrid': return '🔋';
      case 'diesel': return '🚛';
      case 'gasoline': return '⛽';
      default: return '🚗';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Route History</h2>
                <p className="text-sm text-gray-600">{history.length} saved calculations</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {history.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClearHistory}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                  title="Clear All History"
                >
                  <Trash2 className="h-5 w-5" />
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
            {history.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No History Yet</h3>
                <p className="text-gray-500">Your route calculations will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onLoadEntry(entry)}
                    className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{getVehicleIcon(entry.inputData.vehicleType)}</div>
                        <div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(entry.timestamp)}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                            <Package className="h-3 w-3" />
                            <span>{entry.inputData.packageWeight} kg</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-sm text-green-600">
                          <Leaf className="h-3 w-3" />
                          <span>{entry.selectedRoute.carbonEmission.toFixed(2)} kg CO₂</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {entry.selectedRoute.name}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-3 w-3 text-green-600" />
                        <span className="text-gray-600">From:</span>
                        <span className="font-medium text-gray-800 truncate">
                          {entry.inputData.source || 'Not specified'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-3 w-3 text-red-600" />
                        <span className="text-gray-600">To:</span>
                        <span className="font-medium text-gray-800 truncate">
                          {entry.inputData.destination || 'Not specified'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4 pt-3 border-t border-gray-100">
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Distance</div>
                        <div className="font-semibold text-sm">{entry.selectedRoute.distance.toFixed(1)} km</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Duration</div>
                        <div className="font-semibold text-sm">
                          {Math.floor(entry.selectedRoute.duration / 60)}h {entry.selectedRoute.duration % 60}m
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Cost</div>
                        <div className="font-semibold text-sm">${entry.selectedRoute.cost.toFixed(2)}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RouteHistory;