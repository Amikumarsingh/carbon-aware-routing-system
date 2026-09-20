export interface RouteInputData {
  source: string;
  destination: string;
  vehicleType: 'electric' | 'hybrid' | 'diesel' | 'gasoline';
  packageWeight: number;
  priority: 'fastest' | 'cheapest' | 'greenest';
}

export interface RouteData {
  id: string;
  type: 'fastest' | 'cheapest' | 'greenest';
  name: string;
  distance: number; // in km
  duration: number; // in minutes
  cost: number; // in USD
  carbonEmission: number; // in kg CO2
  fuelConsumption: number; // in liters or kWh
  chargingStops?: ChargingStop[];
  waypoints: Coordinate[];
  trafficLevel: 'low' | 'medium' | 'high';
  roadTypes: RoadType[];
}

export interface ChargingStop {
  id: string;
  name: string;
  location: Coordinate;
  chargingTime: number; // in minutes
  cost: number;
}

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface RoadType {
  type: 'highway' | 'urban' | 'rural';
  percentage: number;
}

export interface CarbonSavings {
  comparedToFastest: number;
  comparedToCheapest: number;
  treesEquivalent: number;
  annualSavings: number;
}

export interface RouteHistoryEntry {
  id: string;
  timestamp: Date;
  inputData: RouteInputData;
  routes: RouteData[];
  selectedRoute: RouteData;
}