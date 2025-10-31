import { useState, useCallback } from 'react';
import type { GameState, Card, Character } from '../types/game';
import { getRandomCharacters } from '../data/characters';

// Función para crear cartas del juego
const createGameCards = (characters: Character[]): Card[] => {
  const cards: Card[] = [];
  
  // Crear dos cartas por cada personaje (para formar pares)
  characters.forEach((character) => {
    // Primera carta del par
    cards.push({
      id: `${character.id}-1`,
      characterId: character.id,
      character,
      isFlipped: false,
      isMatched: false,
      isBlocked: false
    });
    
    // Segunda carta del par
    cards.push({
      id: `${character.id}-2`,
      characterId: character.id,
      character,
      isFlipped: false,
      isMatched: false,
      isBlocked: false
    });
  });
  
  // Barajar las cartas aleatoriamente
  return cards.sort(() => Math.random() - 0.5);
};

// Estado inicial del juego
const createInitialGameState = (): GameState => {
  const characters = getRandomCharacters(8);
  const cards = createGameCards(characters);
  
  return {
    cards,
    flippedCards: [],
    matchedPairs: 0,
    attempts: 0,
    isGameActive: false,
    gameComplete: false,
    startTime: null
  };
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState);
  const [lastMatchedCharacter, setLastMatchedCharacter] = useState<Character | null>(null);

  // Iniciar nueva partida
  const startNewGame = useCallback(() => {
    setGameState(createInitialGameState());
    setLastMatchedCharacter(null);
  }, []);

  // Manejar clic en carta
  const handleCardClick = useCallback((cardId: string) => {
    setGameState(prevState => {
      // No permitir clics si el juego está completado
      if (prevState.gameComplete) return prevState;
      
      // No permitir clics si ya hay 2 cartas volteadas
      if (prevState.flippedCards.length >= 2) return prevState;
      
      const cardIndex = prevState.cards.findIndex(card => card.id === cardId);
      if (cardIndex === -1) return prevState;
      
      const clickedCard = prevState.cards[cardIndex];
      
      // No permitir clic en cartas ya volteadas, emparejadas o bloqueadas
      if (clickedCard.isFlipped || clickedCard.isMatched || clickedCard.isBlocked) {
        return prevState;
      }

      // Crear nueva copia del estado
      const newCards = [...prevState.cards];
      const newFlippedCards = [...prevState.flippedCards];
      
      // Voltear la carta
      newCards[cardIndex] = {
        ...clickedCard,
        isFlipped: true
      };
      
      newFlippedCards.push(newCards[cardIndex]);
      
      // Iniciar el juego si es la primera carta
      const isFirstCard = !prevState.isGameActive;
      const startTime = isFirstCard ? new Date() : prevState.startTime;
      
      let newAttempts = prevState.attempts;
      let newMatchedPairs = prevState.matchedPairs;
      let gameComplete = false;
      
      // Si es la segunda carta volteada, verificar si hay par
      if (newFlippedCards.length === 2) {
        newAttempts += 1;
        
        const [firstCard, secondCard] = newFlippedCards;
        
        // Verificar si forman un par
        if (firstCard.characterId === secondCard.characterId) {
          // Es un par - marcar como emparejadas
          const firstCardIndex = newCards.findIndex(card => card.id === firstCard.id);
          const secondCardIndex = newCards.findIndex(card => card.id === secondCard.id);
          
          newCards[firstCardIndex] = { ...newCards[firstCardIndex], isMatched: true, isFlipped: true };
          newCards[secondCardIndex] = { ...newCards[secondCardIndex], isMatched: true, isFlipped: true };
          
          newMatchedPairs += 1;
          
          // Verificar si el juego está completo
          if (newMatchedPairs === 8) {
            gameComplete = true;
          }
          
          // Mostrar el modal inmediatamente
          setLastMatchedCharacter(firstCard.character);
          

          
          // Limpiar cartas volteadas inmediatamente para pares exitosos
          newFlippedCards.length = 0;
        } else {
          // No es un par - programar voltear las cartas después de 1.5 segundos
          setTimeout(() => {
            setGameState(currentState => {
              // Solo voltear si las cartas siguen siendo las mismas que se voltearon
              const currentFirstCard = currentState.cards.find(card => card.id === firstCard.id);
              const currentSecondCard = currentState.cards.find(card => card.id === secondCard.id);
              
              // Verificar que las cartas no hayan sido emparejadas mientras tanto
              if (currentFirstCard && currentSecondCard && 
                  !currentFirstCard.isMatched && !currentSecondCard.isMatched) {
                
                const updatedCards = currentState.cards.map(card => {
                  if (card.id === firstCard.id || card.id === secondCard.id) {
                    return { ...card, isFlipped: false };
                  }
                  return card;
                });
                
                return {
                  ...currentState,
                  cards: updatedCards,
                  flippedCards: []
                };
              }
              
              // Si las cartas ya fueron emparejadas, solo limpiar flippedCards
              return {
                ...currentState,
                flippedCards: []
              };
            });
          }, 1500);
        }
      }
      
      return {
        ...prevState,
        cards: newCards,
        flippedCards: newFlippedCards,
        matchedPairs: newMatchedPairs,
        attempts: newAttempts,
        isGameActive: true,
        gameComplete,
        startTime
      };
    });
  }, []);

  // Reiniciar juego (alias para startNewGame para compatibilidad)
  const resetGame = useCallback(() => {
    startNewGame();
  }, [startNewGame]);

  // Obtener estadísticas del juego
  const getGameStats = useCallback(() => {
    const { startTime, attempts, matchedPairs } = gameState;
    const totalTime = startTime ? Date.now() - startTime.getTime() : 0;
    const efficiency = attempts > 0 ? (matchedPairs / attempts) * 100 : 0;
    
    return {
      totalTime,
      totalAttempts: attempts,
      matchedPairs,
      efficiency
    };
  }, [gameState]);

  // Función para limpiar el último personaje emparejado
  const clearLastMatchedCharacter = useCallback(() => {
    setLastMatchedCharacter(null);
  }, []);

  return {
    gameState,
    lastMatchedCharacter,
    startNewGame,
    handleCardClick,
    resetGame,
    getGameStats,
    clearLastMatchedCharacter
  };
};