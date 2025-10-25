# Country Explorer

A modern web application for exploring countries around the world, featuring both grid and 3D globe visualizations, built with React and TypeScript.

## Features

- 🌍 Interactive 3D globe visualization
- 📱 Responsive grid layout
- 🔍 Real-time search and filtering
- 🌓 Dark/light theme support
- 🔒 JWT authentication
- ♾️ Infinite scroll pagination
- 🎯 Clean architecture principles

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety and better developer experience
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Zustand** - State management
- **react-globe.gl** - 3D globe visualization
- **Three.js** - 3D rendering engine

### Architecture
- Clean Architecture principles
- Domain-driven design
- Repository pattern for data access
- Separation of concerns
- Type-safe interfaces

### Styling
- CSS Variables for theming
- Responsive design principles
- Fluid animations and transitions

## Project Structure

```
src/
├── core/
│   ├── models/        # Domain models
│   ├── store/         # Zustand stores
│   └── usecases/      # Business logic
├── infrastructure/
│   ├── auth/          # Authentication services
│   └── restCountries/ # API integration
├── ui/
│   ├── components/    # Reusable UI components
│   └── pages/         # Route components
└── main.tsx          # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ibra-mustafa/country-explorer.git
   cd country-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Build

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Design Decisions

### Clean Architecture

The project follows Clean Architecture principles to ensure:
- Independence from frameworks
- Testability
- Separation of concerns
- Maintainable and scalable codebase

### State Management

Zustand was chosen for state management because of its:
- Minimal boilerplate
- TypeScript support
- Simple integration with React
- Small bundle size

### Styling Strategy

The styling approach focuses on:
- CSS Variables for consistent theming
- Responsive design using modern CSS features
- Smooth transitions and animations
- Dark/light mode support
- Mobile-first responsive design

### Performance Optimizations

Several optimizations are implemented:
- Infinite scroll for large datasets
- Lazy loading of globe visualization
- Optimized re-renders using React hooks
- Efficient state updates with Zustand

### Security

Security measures include:
- JWT-based authentication
- Protected routes
- Secure cookie handling
- Environment variable configuration

## Features in Detail

### Country Grid View
- Responsive grid layout
- Search by country name
- Filter by region
- Infinite scroll pagination
- Smooth loading states

### 3D Globe View
- Interactive 3D globe visualization
- Country markers sized by population
- Click navigation to country details
- Auto-rotation for better UX
- Smooth camera transitions

### Authentication
- JWT-based authentication
- Protected routes
- Login/Register forms
- Secure session management

### Theme System
- Dark/light mode toggle
- System preference detection
- Smooth theme transitions
- Consistent color palette

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
