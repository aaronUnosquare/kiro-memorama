// Tipos principales del juego de memorama

export interface Character {
  id: string;
  name: string;
  image: string;
  origin: string;
  story: string;
  region: string;
  category: string;
}

export interface Card {
  id: string;
  characterId: string;
  character: Character;
  isFlipped: boolean;
  isMatched: boolean;
  isBlocked: boolean;
}

export interface GameState {
  cards: Card[];
  flippedCards: Card[];
  matchedPairs: number;
  attempts: number;
  isGameActive: boolean;
  gameComplete: boolean;
  startTime: Date | null;
}

export interface AudioState {
  soundEnabled: boolean;
  playFlipSound: () => void;
  playMatchSound: () => void;
  toggleSound: () => void;
  playVictorySound?: () => void;
  setVolume?: (volume: number) => void;
  pauseAllSounds?: () => void;
  stopAllSounds?: () => void;
  isLoaded?: boolean;
}

export interface GameStats {
  totalTime: number;
  totalAttempts: number;
  matchedPairs: number;
  efficiency: number;
}

// Props de componentes
export interface GameBoardProps {
  cards: Card[];
  onCardClick: (cardId: string) => void;
  disabled: boolean;
}

export interface CardProps {
  card: Card;
  onClick: () => void;
  disabled: boolean;
}

export interface ScorePanelProps {
  matchedPairs: number;
  attempts: number;
  elapsedTime: number;
  onNewGame: () => void;
}

export interface CharacterModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface VictoryModalProps {
  isOpen: boolean;
  stats: GameStats;
  onNewGame: () => void;
}

// Contexto del juego
export interface GameContextType {
  gameState: GameState;
  audioState: AudioState;
  startNewGame: () => void;
  handleCardClick: (cardId: string) => void;
  showCharacterModal: (character: Character) => void;
  closeCharacterModal: () => void;
  
  // Estado del cronómetro
  timerState: {
    elapsedTime: number;
    isRunning: boolean;
    formattedTime: string;
    startTimer: () => void;
    stopTimer: () => void;
    resetTimer: () => void;
  };
  
  // Estado del modal de personaje
  selectedCharacter: Character | null;
  isCharacterModalOpen: boolean;
  
  // Estadísticas del juego
  gameStats: GameStats;
}

// Tipos de utilidad
export type CardStatus = 'hidden' | 'flipped' | 'matched';
export type GamePhase = 'setup' | 'playing' | 'completed';
export type SoundType = 'flip' | 'match' | 'victory';