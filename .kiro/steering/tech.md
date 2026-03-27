# Tech Stack & Build System

## Core Technologies
- **React 19.1.1** - UI framework with latest features
- **TypeScript 5.9.3** - Type safety and developer experience
- **Vite 7.1.7** - Build tool and dev server
- **Framer Motion 12.23.24** - Animations and transitions
- **Tailwind CSS 4.1.16** - Utility-first styling

## Development Tools
- **ESLint 9.36.0** - Code linting with TypeScript support
- **PostCSS & Autoprefixer** - CSS processing
- **pnpm** - Package manager (preferred over npm/yarn)

## Build Configuration
- **Target**: ESNext for modern browsers
- **Minifier**: esbuild for fast builds
- **Code splitting**: Vendor chunks (React, Framer Motion)
- **Asset optimization**: 4KB inline limit
- **HMR**: Hot module replacement enabled

## Common Commands
```bash
# Development
pnpm dev                 # Start dev server
pnpm build              # Production build
pnpm build:prod         # Production build with prod mode
pnpm build:analyze      # Build with bundle analysis
pnpm preview            # Preview production build
pnpm lint               # Run ESLint

# Package management
pnpm install            # Install dependencies
pnpm add <package>      # Add dependency
pnpm add -D <package>   # Add dev dependency
```

## Performance Optimizations
- Manual chunk splitting for better caching
- Dependency pre-bundling (React, Framer Motion)
- Asset inlining for small files
- Tree shaking enabled
- Modern ES modules