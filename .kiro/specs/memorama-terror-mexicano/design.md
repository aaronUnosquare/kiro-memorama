# Documento de Diseño

## Visión General

El juego de memorama de terror mexicano es una aplicación web interactiva que combina el entretenimiento del juego clásico de memoria con la educación sobre el folclore mexicano. La aplicación presenta una interfaz visualmente atractiva con temática del Día de Muertos y efectos de sonido inmersivos.

## Arquitectura

### Arquitectura General
- **Frontend**: Aplicación React 18+ con TypeScript
- **Styling**: Tailwind CSS para diseño responsive y utility-first
- **Animaciones**: Framer Motion para animaciones fluidas y interactivas
- **Estado**: React hooks (useState, useEffect, useContext) para gestión de estado
- **Build Tool**: Vite para desarrollo rápido y build optimizado
- **Package Manager**: pnpm para gestión eficiente de dependencias

### Estructura de Directorios
```
memorama-terror-mexicano/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── characters/
│   │   │   └── ui/
│   │   └── audio/
│   │       ├── flip-sounds/
│   │       └── success-sounds/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── GameBoard.tsx
│   │   ├── Card.tsx
│   │   ├── ScorePanel.tsx
│   │   ├── CharacterModal.tsx
│   │   └── VictoryModal.tsx
│   ├── hooks/
│   │   ├── useGameState.ts
│   │   ├── useAudio.ts
│   │   └── useTimer.ts
│   ├── context/
│   │   └── GameContext.tsx
│   ├── data/
│   │   └── characters.ts
│   ├── types/
│   │   └── game.ts
│   ├── utils/
│   │   └── gameLogic.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── pnpm-lock.yaml
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Componentes e Interfaces

### 1. Componente Principal (App)
```typescript
interface AppProps {}
const App: React.FC<AppProps> = () => {
  // Proveedor de contexto del juego
  // Renderiza GameBoard y UI components
}
```

### 2. Componente Tablero (GameBoard)
```typescript
interface GameBoardProps {
  cards: CardType[]
  onCardClick: (cardId: string) => void
  disabled: boolean
}
const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardClick, disabled }) => {
  // Grid 4x4 con Tailwind CSS
  // Renderiza componentes Card
}
```

### 3. Componente Carta (Card)
```typescript
interface CardProps {
  card: CardType
  onClick: () => void
  disabled: boolean
}
const Card: React.FC<CardProps> = ({ card, onClick, disabled }) => {
  // Animación de volteo con Framer Motion
  // Muestra personaje o reverso
}
```

### 4. Hook de Estado del Juego (useGameState)
```typescript
interface GameState {
  cards: CardType[]
  flippedCards: CardType[]
  matchedPairs: number
  attempts: number
  isGameActive: boolean
  gameComplete: boolean
}

const useGameState = () => {
  // Lógica principal del juego
  // Manejo de clics en cartas
  // Detección de pares
  // Reinicio de juego
}
```

### 5. Hook de Audio (useAudio)
```typescript
interface AudioState {
  soundEnabled: boolean
  playFlipSound: () => void
  playMatchSound: () => void
  toggleSound: () => void
}

const useAudio = (): AudioState => {
  // Gestión de efectos de sonido
  // Preload de archivos de audio
  // Control de volumen
}
```

### 6. Contexto del Juego (GameContext)
```typescript
interface GameContextType {
  gameState: GameState
  audioState: AudioState
  startNewGame: () => void
  handleCardClick: (cardId: string) => void
}

const GameContext = createContext<GameContextType | null>(null)
```

## Modelos de Datos

### Personaje de Terror
```javascript
{
  id: "la-llorona",
  name: "La Llorona",
  image: "assets/images/characters/la-llorona.png",
  origin: "Folclore mexicano",
  story: "Mujer que perdió a sus hijos y los busca eternamente cerca de ríos y lagos, lamentándose con su característico llanto.",
  region: "Todo México",
  category: "fantasma"
}
```

### Estado del Juego
```javascript
{
  board: Card[16],
  flippedCards: Card[],
  matchedPairs: number,
  attempts: number,
  startTime: Date,
  isGameActive: boolean,
  soundEnabled: boolean
}
```

### Estadísticas de Partida
```javascript
{
  totalTime: number,
  totalAttempts: number,
  matchedPairs: number,
  efficiency: number
}
```

## Manejo de Errores

### Errores de Carga de Recursos
- **Imágenes faltantes**: Mostrar imagen placeholder con estilo mexicano
- **Audio no disponible**: Continuar juego sin sonido, mostrar indicador visual
- **Datos de personajes**: Usar conjunto mínimo de personajes predefinidos

### Errores de Interacción
- **Clics rápidos**: Implementar debouncing para evitar clics múltiples
- **Estado inconsistente**: Validar estado del juego antes de cada acción
- **Memoria insuficiente**: Optimizar carga de imágenes y audio

### Manejo de Excepciones
```javascript
try {
  // Operación del juego
} catch (error) {
  console.error('Error en el juego:', error);
  // Mostrar mensaje amigable al usuario
  // Intentar recuperación automática
}
```

## Estrategia de Pruebas

### Pruebas Unitarias
- **Lógica del juego**: Verificar detección de pares, conteo de intentos
- **Gestión de estado**: Validar transiciones de estado del juego
- **Utilidades**: Funciones de barajado, temporizador, validaciones

### Pruebas de Integración
- **Flujo completo**: Desde inicio hasta victoria del juego
- **Interacción audio-visual**: Sincronización de efectos
- **Responsive design**: Funcionamiento en diferentes tamaños de pantalla

### Pruebas de Usuario
- **Usabilidad**: Facilidad de uso en dispositivos móviles
- **Accesibilidad**: Navegación por teclado, lectores de pantalla
- **Rendimiento**: Tiempo de carga, fluidez de animaciones

## Diseño Visual

### Configuración de Tailwind CSS
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'mexican-orange': '#FF6B35',
        'mexican-purple': '#2D1B69',
        'mexican-gold': '#FFD700',
        'blood-red': '#8B0000',
        'bone-white': '#F5F5DC'
      },
      fontFamily: {
        'creepy': ['Creepster', 'cursive'],
        'body': ['Inter', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 1s ease-in-out 2'
      }
    }
  }
}
```

### Clases Tailwind Principales
- **Layout**: `grid grid-cols-4 gap-4`, `flex items-center justify-center`
- **Colores**: `bg-mexican-orange`, `text-bone-white`, `border-mexican-gold`
- **Responsive**: `sm:grid-cols-2 md:grid-cols-4`, `text-sm md:text-base`
- **Efectos**: `hover:scale-105`, `transition-all duration-300`

### Elementos Visuales
- **Cartas**: Diseño con motivos del Día de Muertos en el reverso
- **Fondo**: Patrón sutil con elementos mexicanos (papel picado, calaveras)
- **Animaciones**: Transiciones suaves para voltear cartas (transform 3D)
- **Iconografía**: Elementos culturales mexicanos (cempasúchil, calaveras)

### Animaciones con Framer Motion
```typescript
// Animación de volteo de carta
const cardVariants = {
  front: { rotateY: 0 },
  back: { rotateY: 180 }
}

// Animación de entrada del tablero
const boardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Animación de éxito en par
const matchVariants = {
  matched: {
    scale: [1, 1.1, 1],
    transition: { duration: 0.5 }
  }
}
```

## Consideraciones de Rendimiento

### Optimización de Imágenes
- **Formato**: WebP con fallback a PNG
- **Tamaño**: Máximo 200x200px para personajes
- **Compresión**: Optimización para web manteniendo calidad visual

### Gestión de Memoria
- **Lazy loading**: Cargar imágenes solo cuando sean necesarias
- **Cleanup**: Liberar recursos de audio al cambiar de partida
- **Cache**: Almacenar recursos frecuentemente usados

### Optimización de Audio
- **Formato**: MP3 comprimido para compatibilidad
- **Preload**: Cargar efectos de sonido al inicio
- **Pool de sonidos**: Reutilizar instancias de audio

## Accesibilidad

### Navegación por Teclado
- **Tab order**: Orden lógico de navegación
- **Enter/Space**: Activar cartas y botones
- **Escape**: Cerrar modales

### Lectores de Pantalla
- **Alt text**: Descripciones de imágenes de personajes
- **ARIA labels**: Etiquetas para elementos interactivos
- **Live regions**: Anunciar cambios de estado del juego

### Contraste y Visibilidad
- **Ratio de contraste**: Mínimo 4.5:1 para texto
- **Indicadores visuales**: Alternativas a información solo por color
- **Tamaño de elementos**: Mínimo 44px para touch targets