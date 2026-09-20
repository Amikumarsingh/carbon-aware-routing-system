import { RouteInputData, RouteData, ChargingStop, Coordinate, RoadType } from '../types';

export const calculateRoutes = (inputData: RouteInputData): RouteData[] => {
  // Mock data - in real implementation, this would call Django API
  const baseDistance = 45 + Math.random() * 20; // 45-65 km
  const baseDuration = 55 + Math.random() * 20; // 55-75 minutes

  // Vehicle emission factors (kg CO2 per km per kg load)
  const emissionFactors = {
    electric: 0.05,
    hybrid: 0.12,
    diesel: 0.25,
    gasoline: 0.22
  };

  // Generate mock waypoints
  const generateWaypoints = (): Coordinate[] => [
    { lat: 40.7128, lng: -74.0060 }, // Start
    { lat: 40.7589, lng: -73.9851 }, // Mid
    { lat: 40.7831, lng: -73.9712 }  // End
  ];

  // Generate charging stops for EVs
  const generateChargingStops = (): ChargingStop[] => {
    if (inputData.vehicleType !== 'electric') return [];
    
    return [
      {
        id: 'cs1',
        name: 'Tesla Supercharger - Manhattan',
        location: { lat: 40.7589, lng: -73.9851 },
        chargingTime: 25,
        cost: 12.50
      }
    ];
  };

  // Generate road type distribution
  const generateRoadTypes = (routeType: string): RoadType[] => {
    switch (routeType) {
      case 'fastest':
        return [
          { type: 'highway', percentage: 70 },
          { type: 'urban', percentage: 25 },
          { type: 'rural', percentage: 5 }
        ];
      case 'cheapest':
        return [
          { type: 'highway', percentage: 40 },
          { type: 'urban', percentage: 45 },
          { type: 'rural', percentage: 15 }
        ];
      case 'greenest':
        return [
          { type: 'highway', percentage: 20 },
          { type: 'urban', percentage: 30 },
          { type: 'rural', percentage: 50 }
        ];
      default:
        return [
          { type: 'highway', percentage: 50 },
          { type: 'urban', percentage: 35 },
          { type: 'rural', percentage: 15 }
        ];
    }
  };

  const routes: RouteData[] = [
    // Fastest Route
    {
      id: 'fastest-1',
      type: 'fastest',
      name: 'Fastest Route',
      distance: baseDistance * 0.95,
      duration: baseDuration * 0.85,
      cost: 28.50,
      carbonEmission: baseDistance * 0.95 * emissionFactors[inputData.vehicleType] * (inputData.packageWeight / 10) * 1.4,
      fuelConsumption: baseDistance * 0.95 * 0.08 * (inputData.packageWeight / 10),
      chargingStops: generateChargingStops(),
      waypoints: generateWaypoints(),
      trafficLevel: 'high',
      roadTypes: generateRoadTypes('fastest')
    },
    
    // Cheapest Route
    {
      id: 'cheapest-1',
      type: 'cheapest',
      name: 'Most Economical',
      distance: baseDistance * 1.15,
      duration: baseDuration * 1.25,
      cost: 22.75,
      carbonEmission: baseDistance * 1.15 * emissionFactors[inputData.vehicleType] * (inputData.packageWeight / 10) * 1.1,
      fuelConsumption: baseDistance * 1.15 * 0.07 * (inputData.packageWeight / 10),
      chargingStops: generateChargingStops(),
      waypoints: generateWaypoints(),
      trafficLevel: 'medium',
      roadTypes: generateRoadTypes('cheapest')
    },
    
    // Greenest Route
    {
      id: 'greenest-1',
      type: 'greenest',
      name: 'Eco-Friendly',
      distance: baseDistance * 1.08,
      duration: baseDuration * 1.1,
      cost: 25.25,
      carbonEmission: baseDistance * 1.08 * emissionFactors[inputData.vehicleType] * (inputData.packageWeight / 10) * 0.75,
      fuelConsumption: baseDistance * 1.08 * 0.06 * (inputData.packageWeight / 10),
      chargingStops: generateChargingStops(),
      waypoints: generateWaypoints(),
      trafficLevel: 'low',
      roadTypes: generateRoadTypes('greenest')
    }
  ];

  return routes;
};