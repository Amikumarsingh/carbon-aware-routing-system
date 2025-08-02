import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Truck, Package, Calculator, Loader2, RotateCcw } from 'lucide-react';
import { RouteInputData } from '../types';

interface RouteInputProps {
  onCalculate: (data: RouteInputData) => void;
  onReset: () => void;
  isLoading: boolean;
}

const RouteInput: React.FC<RouteInputProps> = ({ onCalculate, onReset, isLoading }) => {
  const [formData, setFormData] = useState<RouteInputData>({
    source: '',
    destination: '',
    vehicleType: 'electric',
    packageWeight: 10,
    priority: 'greenest'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const handleReset = () => {
    setFormData({
      source: '',
      destination: '',
      vehicleType: 'electric',
      packageWeight: 10,
      priority: 'greenest'
    });
    onReset();
  };

  const vehicleOptions = [
    { value: 'electric', label: 'Electric Vehicle', icon: '⚡', color: 'text-green-600' },
    { value: 'hybrid', label: 'Hybrid Vehicle', icon: '🔋', color: 'text-blue-600' },
    { value: 'diesel', label: 'Diesel Truck', icon: '🚛', color: 'text-orange-600' },
    { value: 'gasoline', label: 'Gasoline Van', icon: '⛽', color: 'text-red-600' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-emerald-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
            <Calculator className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Route Calculator</h2>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Reset Form"
        >
          <RotateCcw className="h-4 w-4 text-gray-600" />
        </motion.button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4" />
              <span>From</span>
            </label>
            <input
              type="text"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              placeholder="Enter pickup address"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4" />
              <span>To</span>
            </label>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              placeholder="Enter delivery address"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
            <Truck className="h-4 w-4" />
            <span>Vehicle Type</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {vehicleOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center space-x-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.vehicleType === option.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="vehicleType"
                  value={option.value}
                  checked={formData.vehicleType === option.value}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value as any })}
                  className="sr-only"
                />
                <span className="text-xl">{option.icon}</span>
                <div>
                  <div className="text-sm font-medium text-gray-800">{option.label}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <Package className="h-4 w-4" />
            <span>Package Weight</span>
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="1"
              max="100"
              value={formData.packageWeight}
              onChange={(e) => setFormData({ ...formData, packageWeight: parseInt(e.target.value) })}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="min-w-[60px] text-right">
              <span className="text-lg font-semibold text-gray-800">{formData.packageWeight}</span>
              <span className="text-sm text-gray-600"> kg</span>
            </div>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Calculating Routes...</span>
            </>
          ) : (
            <>
              <Calculator className="h-5 w-5" />
              <span>Calculate Smart Routes</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default RouteInput;