import React from 'react';
import { Leaf, Truck, Settings, History, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onShowHistory: () => void;
  onReset: () => void;
  hasRoutes: boolean;
  historyCount: number;
}

const Header: React.FC<HeaderProps> = ({ onShowHistory, onReset, hasRoutes, historyCount }) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">EcoRoute</h1>
              <p className="text-sm text-gray-600">Smart Carbon-Aware Delivery</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Truck className="h-4 w-4" />
              <span>Walmart Logistics</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* History Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onShowHistory}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
                title="View Route History"
              >
                <History className="h-5 w-5 text-gray-600" />
                {historyCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {historyCount > 9 ? '9+' : historyCount}
                  </span>
                )}
              </motion.button>

              {/* Reset Button */}
              {hasRoutes && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onReset}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
                  title="Reset Routes"
                >
                  <RotateCcw className="h-5 w-5 text-gray-600" />
                </motion.button>
              )}

              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;