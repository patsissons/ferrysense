# FerrySense Mobile App

A React Native mobile application built with modern technologies and best practices.

## Tech Stack

- React Native
- Expo
- TypeScript
- React Native Paper (Material Design components)
- pnpm (Package manager)
- Hermes Engine

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- pnpm package manager
- Expo Go app on your mobile device (for development)

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm start
```

3. Run on specific platforms:
```bash
# For iOS
pnpm run ios

# For Android
pnpm run android

# For web
pnpm run web
```

## Project Structure

- `src/` - Application source code
  - `App.tsx` - Main application component
  - `routes/` - Screen components and navigation configuration
    - `home/` - Home screen components and utilities
      - `index.tsx` - Home screen component
    - `profile/` - Profile screen components and utilities
      - `index.tsx` - Profile screen component
    - `settings/` - Settings screen components and utilities
      - `index.tsx` - Settings screen component
    - `index.ts` - Route exports and configuration
- `assets/` - Static assets like images and fonts
- `index.ts` - Application entry point

## Features

- Material Design UI components with React Native Paper
- Bottom navigation with three screens (Home, Profile, Settings)
- TypeScript for type safety
- Hermes engine for improved performance
- Safe area handling for modern devices
