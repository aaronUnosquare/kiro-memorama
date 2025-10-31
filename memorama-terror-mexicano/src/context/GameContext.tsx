import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import type { GameContextType, Character } from '../types/game';
import { useGameState } from '../hooks/useGameState';
import { useAudio } from '../hooks/useAudio';
import { useTimer } from '../hooks/useTimer';
import { debounce, measurePerformance } from '../utils/performance';

// Crear el contexto del juego
const GameContext = createContext<GameContextType | null>(null);

// Props del proveedor de contexto
interface GameProviderProps {
  children: React.ReactNode;
}

// Proveedor del contexto del juego
export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  // Estados de los hooks personalizados
  const audioState = useAudio();
  const timerHook = useTimer();
  
  // Estado para el modal de personaje
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);
  
  const gameStateHook = useGameState();
  
  // Efecto para manejar cuando se encuentra un nuevo par
  useEffect(() => {
    if (gameStateHook.lastMatchedCharacter) {
      // Reproducir sonido de éxito
      audioState.playMatchSound();
      
      // Mostrar modal con información del personaje
      setSelectedCharacter(gameStateHook.lastMatchedCharacter);
      setIsCharacterModalOpen(true);
      
      // Limpiar inmediatamente para evitar que se reproduzca infinitamente
      gameStateHook.clearLastMatchedCharacter();
    }
  }, [gameStateHook.lastMatchedCharacter, audioState, gameStateHook]);

  // Función para iniciar nueva partida
  const startNewGame = useCallback(() => {
    gameStateHook.startNewGame();
    timerHook.resetTimer();
    setSelectedCharacter(null);
    setIsCharacterModalOpen(false);
  }, [gameStateHook, timerHook]);

  // Función optimizada para manejar clics en cartas con debounce
  const handleCardClick = useCallback(
    debounce((cardId: string) => {
      measurePerformance('handleCardClick', () => {
        const { gameState } = gameStateHook;
        
        // No permitir clics si el juego está completado
        if (gameState.gameComplete) return;
        
        // Iniciar cronómetro si es la primera carta y el juego no está activo
        if (!gameState.isGameActive && gameState.flippedCards.length === 0) {
          timerHook.startTimer();
        }
        
        // Reproducir sonido de voltear carta
        audioState.playFlipSound();
        
        // Manejar el clic en la carta
        gameStateHook.handleCardClick(cardId);
      });
    }, 100), // Reducir debounce para mejor responsividad
    [gameStateHook, audioState, timerHook, isCharacterModalOpen]
  );

  // Función para mostrar modal de personaje
  const showCharacterModal = useCallback((character: Character) => {
    setSelectedCharacter(character);
    setIsCharacterModalOpen(true);
  }, []);

  // Función para cerrar modal de personaje
  const closeCharacterModal = useCallback(() => {
    setSelectedCharacter(null);
    setIsCharacterModalOpen(false);
  }, []);



  // Efecto para manejar la finalización del juego
  useEffect(() => {
    const { gameState } = gameStateHook;
    
    if (gameState.gameComplete && timerHook.isRunning) {
      // Detener cronómetro cuando el juego se complete
      timerHook.stopTimer();
      
      // Reproducir sonido de victoria
      audioState.playVictorySound?.();
    }
  }, [gameStateHook.gameState.gameComplete, timerHook, audioState]);

  // Crear el valor del contexto con memoización para optimizar re-renders
  const contextValue: GameContextType = useMemo(() => ({
    gameState: gameStateHook.gameState,
    audioState,
    startNewGame,
    handleCardClick,
    showCharacterModal,
    closeCharacterModal,
    
    // Propiedades adicionales útiles
    timerState: {
      elapsedTime: timerHook.elapsedTime,
      isRunning: timerHook.isRunning,
      formattedTime: timerHook.getFormattedTime(),
      startTimer: timerHook.startTimer,
      stopTimer: timerHook.stopTimer,
      resetTimer: timerHook.resetTimer
    },
    
    // Estado del modal de personaje
    selectedCharacter,
    isCharacterModalOpen,
    
    // Estadísticas del juego
    gameStats: gameStateHook.getGameStats()
  }), [
    gameStateHook.gameState,
    audioState,
    startNewGame,
    handleCardClick,
    showCharacterModal,
    closeCharacterModal,
    timerHook.elapsedTime,
    timerHook.isRunning,
    timerHook.getFormattedTime,
    timerHook.startTimer,
    timerHook.stopTimer,
    timerHook.resetTimer,
    selectedCharacter,
    isCharacterModalOpen,
    gameStateHook.getGameStats
  ]);

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

// Hook personalizado para usar el contexto del juego
export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  
  if (!context) {
    throw new Error('useGameContext debe ser usado dentro de un GameProvider');
  }
  
  return context;
};

// Exportar el contexto para casos especiales
export { GameContext };