# Carbon-Aware Smart Routing System

A modern web application that optimizes delivery routes based on speed, cost, and environmental impact. Built with React, TypeScript, and Tailwind CSS.

![Carbon-Aware Routing](https://images.pexels.com/photos/586687/pexels-photo-586687.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## 🌟 Features

- **Smart Route Optimization**: Calculate optimal delivery routes based on multiple criteria
- **Carbon Impact Analysis**: Real-time carbon emission calculations and environmental impact visualization
- **Multi-Vehicle Support**: Support for electric, hybrid, diesel, and gasoline vehicles
- **Interactive Dashboard**: Beautiful charts and analytics for carbon savings
- **Route History**: Save and revisit previous route calculations
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Calculations**: Dynamic route optimization with loading states

## 🚀 Live Demo

Visit the live application: [Carbon-Aware Routing System](https://resonant-stroopwafel-d7acc3.netlify.app)

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/carbon-aware-routing-system.git
   cd carbon-aware-routing-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Application header with navigation
│   ├── RouteInput.tsx   # Route input form
│   ├── RouteComparison.tsx  # Route comparison cards
│   ├── CarbonDashboard.tsx  # Carbon impact dashboard
│   └── RouteHistory.tsx     # Route history modal
├── types/               # TypeScript type definitions
│   └── index.ts        # Main type definitions
├── utils/              # Utility functions
│   └── routeCalculator.ts  # Route calculation logic
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🎯 Usage

### Basic Route Calculation

1. **Enter Route Details**
   - Source address (pickup location)
   - Destination address (delivery location)

2. **Select Vehicle Type**
   - Electric Vehicle (⚡)
   - Hybrid Vehicle (🔋)
   - Diesel Truck (🚛)
   - Gasoline Van (⛽)

3. **Set Package Weight**
   - Use the slider to set package weight (1-100 kg)

4. **Calculate Routes**
   - Click "Calculate Smart Routes" to generate optimized routes
   - View three route options: Fastest, Cheapest, and Greenest

### Understanding Route Options

- **Fastest Route**: Optimized for minimum travel time
- **Cheapest Route**: Optimized for lowest cost
- **Greenest Route**: Optimized for minimum carbon emissions (recommended)

### Carbon Impact Dashboard

The dashboard provides:
- Route emission comparison charts
- Carbon savings breakdown
- Environmental impact metrics
- Annual savings projections

## 🌱 Environmental Impact

This application helps reduce carbon emissions by:
- Providing eco-friendly route alternatives
- Calculating real-time carbon impact
- Encouraging sustainable delivery practices
- Tracking environmental savings over time

## 📊 Features in Detail

### Route Optimization
- Multi-criteria optimization (time, cost, emissions)
- Real-time traffic consideration
- Vehicle-specific calculations
- Package weight impact analysis

### Carbon Calculations
- Vehicle-specific emission factors
- Load-based emission scaling
- Comparative analysis with other routes
- Tree planting equivalency metrics

### User Experience
- Intuitive form interface
- Real-time loading states
- Smooth animations and transitions
- Responsive design for all devices

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

The project uses:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting (recommended)

## 🚀 Deployment

### Netlify (Recommended)

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the `dist` folder to your hosting provider

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Pexels](https://pexels.com) for stock images
- [Lucide](https://lucide.dev) for beautiful icons
- [Recharts](https://recharts.org) for chart components
- [Framer Motion](https://framer.com/motion) for animations

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**Made with ❤️ for a sustainable future**