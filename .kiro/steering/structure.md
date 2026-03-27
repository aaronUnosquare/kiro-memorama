# Project Structure & Architecture

## Folder Organization
```
memorama-terror-mexicano/
├── src/
│   ├── components/          # Reusable UI components
│   ├── context/            # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   ├── data/               # Static data and constants
│   ├── utils/              # Utility functions
│   ├── assets/             # Build-time assets
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles
├── public/
│   └── assets/
│       ├── images/         # Game images (SVG preferred)
│       └── audio/          # Sound effects
├── dist/                   # Build output
└── node_modules/           # Dependencies
```

## Architecture Patterns

### Component Structure
- **Barrel exports** in `components/index.ts` for clean imports
- **Single responsibility** - each component has one clear purpose
- **Props interfaces** defined in `types/game.ts`
- **Default exports** for components, named exports for utilities

### State Management
- **React Context** (`GameContext`) for global game state
- **Custom hooks** for specific functionality (audio, timer, game logic)
- **Local state** for component-specific UI state
- **Immutable updates** using spread operators

### File Naming Conventions
- **PascalCase** for components (`GameBoard.tsx`)
- **camelCase** for hooks (`useGameState.ts`)
- **kebab-case** for assets (`la-llorona.svg`)
- **lowercase** for utilities (`audioUtils.ts`)

### Import Organization
1. React imports first
2. Third-party libraries
3. Internal components/hooks
4. Types and interfaces
5. Relative imports last

### Asset Management
- **SVG images** for scalable graphics
- **MP3 audio** for sound effects
- **Public folder** for runtime assets
- **Lazy loading** for performance optimization

## Code Style Guidelines
- **TypeScript strict mode** enabled
- **Functional components** with hooks
- **Arrow functions** for component definitions
- **Explicit return types** for complex functions
- **Descriptive variable names** reflecting Mexican culture context