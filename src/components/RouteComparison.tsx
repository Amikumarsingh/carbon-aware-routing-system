import React from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Leaf, Zap, Route, Award } from 'lucide-react';
import { RouteData } from '../types';

interface RouteComparisonProps {
  routes: RouteData[];
  selectedRoute: RouteData | null;
  onRouteSelect: (route: RouteData) => void;
}

const RouteComparison: React.FC<RouteComparisonProps> = ({ routes, selectedRoute, onRouteSelect }) => {
  const getRouteIcon = (type: string) => {
    switch (type) {
      case 'fastest': return Clock;
      case 'cheapest': return DollarSign;
      case 'greenest': return Leaf;
      default: return Route;
    }
  };

  const getRouteColor = (type: string) => {
    switch (type) {
      case 'fastest': return 'from-blue-500 to-indigo-500';
      case 'cheapest': return 'from-yellow-500 to-orange-500';
      case 'greenest': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'fastest': return 'bg-blue-100 text-blue-800';
      case 'cheapest': return 'bg-yellow-100 text-yellow-800';
      case 'greenest': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-emerald-100"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
          <Route className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Route Options</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {routes.map((route, index) => {
          const Icon = getRouteIcon(route.type);
          const isSelected = selectedRoute?.id === route.id;
          
          return (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => onRouteSelect(route)}
              className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                isSelected 
                  ? 'border-primary-500 bg-primary-50 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {route.type === 'greenest' && (
                <div className="absolute -top-2 -right-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
                    <Award className="h-3 w-3" />
                    <span>BEST</span>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-r ${getRouteColor(route.type)} rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(route.type)}`}>
                  {route.name}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Distance</span>
                  <span className="font-semibold">{route.distance} km</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Duration</span>
                  <span className="font-semibold">{Math.floor(route.duration / 60)}h {route.duration % 60}m</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Cost</span>
                  <span className="font-semibold">${route.cost.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 flex items-center space-x-1">
                    <Leaf className="h-3 w-3" />
                    <span>CO₂ Emission</span>
                  </span>
                  <span className="font-semibold text-green-600">{route.carbonEmission.toFixed(2)} kg</span>
                </div>

                {route.chargingStops && route.chargingStops.length > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 flex items-center space-x-1">
                      <Zap className="h-3 w-3" />
                      <span>Charging Stops</span>
                    </span>
                    <span className="font-semibold text-blue-600">{route.chargingStops.length}</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedRoute && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-200"
        >
          <h3 className="font-semibold text-gray-800 mb-2">Selected Route Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Traffic Level</span>
              <div className={`font-semibold capitalize ${
                selectedRoute.trafficLevel === 'low' ? 'text-green-600' :
                selectedRoute.trafficLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {selectedRoute.trafficLevel}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Fuel Usage</span>
              <div className="font-semibold">{selectedRoute.fuelConsumption.toFixed(1)} {selectedRoute.vehicleType === 'electric' ? 'kWh' : 'L'}</div>
            </div>
            <div>
              <span className="text-gray-600">Road Types</span>
              <div className="font-semibold">
                {selectedRoute.roadTypes.map(road => `${road.percentage}% ${road.type}`).join(', ')}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Waypoints</span>
              <div className="font-semibold">{selectedRoute.waypoints.length} stops</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RouteComparison;