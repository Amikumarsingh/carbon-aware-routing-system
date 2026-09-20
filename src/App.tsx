import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import RouteInput from './components/RouteInput';
import RouteComparison from './components/RouteComparison';
import CarbonDashboard from './components/CarbonDashboard';
import RouteHistory from './components/RouteHistory';
import { RouteData, RouteInputData, RouteHistoryEntry } from './types';
import { calculateRoutes } from './utils/routeCalculator';

function App() {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<RouteHistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('routeHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory).map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp)
        }));
        setHistory(parsedHistory);
      } catch (error) {
        console.error('Error loading history:', error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('routeHistory', JSON.stringify(history));
  }, [history]);

  const handleRouteCalculation = async (inputData: RouteInputData) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      const calculatedRoutes = calculateRoutes(inputData);
      setRoutes(calculatedRoutes);
      setSelectedRoute(calculatedRoutes[2]); // Default to greenest route

      // Add to history
      const historyEntry: RouteHistoryEntry = {
        id: Date.now().toString(),
        timestamp: new Date(),
        inputData,
        routes: calculatedRoutes,
        selectedRoute: calculatedRoutes[2]
      };

      setHistory(prev => [historyEntry, ...prev.slice(0, 9)]); // Keep last 10 entries
    } catch (error) {
      console.error('Error calculating routes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRoutes([]);
    setSelectedRoute(null);
    setShowHistory(false);
  };

  const handleLoadFromHistory = (entry: RouteHistoryEntry) => {
    setRoutes(entry.routes);
    setSelectedRoute(entry.selectedRoute);
    setShowHistory(false);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('routeHistory');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <Header 
        onShowHistory={() => setShowHistory(true)}
        onReset={handleReset}
        hasRoutes={routes.length > 0}
        historyCount={history.length}
      />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
            Carbon-Aware Smart Routing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Optimize delivery routes for speed, cost, and environmental impact. 
            Make every delivery count towards a sustainable future.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <RouteInput 
              onCalculate={handleRouteCalculation} 
              isLoading={isLoading}
              onReset={handleReset}
            />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            {routes.length > 0 && (
              <>
                <RouteComparison 
                  routes={routes}
                  selectedRoute={selectedRoute}
                  onRouteSelect={setSelectedRoute}
                />
                <CarbonDashboard selectedRoute={selectedRoute} />
              </>
            )}
          </div>
        </div>
      </main>

      {/* History Modal */}
      {showHistory && (
        <RouteHistory
          history={history}
          onClose={() => setShowHistory(false)}
          onLoadEntry={handleLoadFromHistory}
          onClearHistory={handleClearHistory}
        />
      )}
    </div>
  );
}

export default App;