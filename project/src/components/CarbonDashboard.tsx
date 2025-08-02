import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Leaf, TreePine, TrendingDown, Award } from 'lucide-react';
import { RouteData } from '../types';

interface CarbonDashboardProps {
  selectedRoute: RouteData | null;
}

const CarbonDashboard: React.FC<CarbonDashboardProps> = ({ selectedRoute }) => {
  if (!selectedRoute) return null;

  const emissionData = [
    { name: 'Fastest Route', emission: 15.2, color: '#3B82F6' },
    { name: 'Cheapest Route', emission: 12.8, color: '#F59E0B' },
    { name: 'Greenest Route', emission: selectedRoute.carbonEmission, color: '#10B981' },
  ];

  const savingsData = [
    { name: 'Carbon Saved', value: 15.2 - selectedRoute.carbonEmission, color: '#10B981' },
    { name: 'Current Emission', value: selectedRoute.carbonEmission, color: '#EF4444' },
  ];

  const treesEquivalent = Math.round((15.2 - selectedRoute.carbonEmission) / 0.021);
  const annualSavings = (15.2 - selectedRoute.carbonEmission) * 365 * 2; // Assuming 2 deliveries per day

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-emerald-100"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
          <Leaf className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Carbon Impact Dashboard</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Route Emission Comparison</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={emissionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value) => [`${value} kg CO₂`, 'Emission']}
                labelStyle={{ color: '#374151' }}
              />
              <Bar dataKey="emission" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Carbon Savings Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={savingsData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {savingsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value.toFixed(2)} kg CO₂`, '']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200"
        >
          <div className="flex items-center space-x-3 mb-2">
            <TrendingDown className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Carbon Saved</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {(15.2 - selectedRoute.carbonEmission).toFixed(2)} kg
          </div>
          <div className="text-xs text-green-600">vs. fastest route</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200"
        >
          <div className="flex items-center space-x-3 mb-2">
            <TreePine className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Trees Equivalent</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{treesEquivalent}</div>
          <div className="text-xs text-blue-600">trees planted</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200"
        >
          <div className="flex items-center space-x-3 mb-2">
            <Award className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Annual Impact</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">{annualSavings.toFixed(0)} kg</div>
          <div className="text-xs text-purple-600">CO₂ saved yearly</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border border-green-200"
      >
        <div className="flex items-center space-x-2 mb-2">
          <Leaf className="h-5 w-5 text-green-600" />
          <span className="font-semibold text-green-800">Environmental Impact Summary</span>
        </div>
        <p className="text-sm text-green-700">
          By choosing the greenest route, you're reducing carbon emissions by{' '}
          <span className="font-bold">{((15.2 - selectedRoute.carbonEmission) / 15.2 * 100).toFixed(1)}%</span>{' '}
          compared to the fastest route. This is equivalent to planting{' '}
          <span className="font-bold">{treesEquivalent} trees</span> or saving{' '}
          <span className="font-bold">{annualSavings.toFixed(0)} kg of CO₂</span> annually.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default CarbonDashboard;