import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import type { GameBoardProps } from '../types/game';

const GameBoard: React.FC<GameBoardProps> = React.memo(({ cards, onCardClick, disabled }) => {
  // Variantes de animación para la entrada del tablero
  const boardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Variantes para cada carta individual
  const cardItemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateY: -90
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center p-2 sm:p-4 md:p-6 mb-10">
      <motion.div
        className="grid grid-cols-4 gap-6 sm:gap-8 md:gap-10"
        style={{ 
          aspectRatio: '1',
          maxWidth: '60vh',  // Mantener proporción cuadrada
          width: '100%',
          maxWidth: '500px'  // Tamaño máximo más conservador
        }}
        variants={boardVariants}
        initial="hidden"
        animate="visible"
      >
        {cards.map((card) => (
          <motion.div
            key={card.id}
            variants={cardItemVariants}
            className="w-full h-full"
            whileHover={!disabled && !card.isFlipped && !card.isMatched ? { 
              y: -2,
              transition: { duration: 0.2 }
            } : {}}
          >
            <Card
              card={card}
              onClick={() => onCardClick(card.id)}
              disabled={disabled}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Decoración de fondo del tablero */}
      <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-repeat-space" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm20 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>
    </div>
  );
});

GameBoard.displayName = 'GameBoard';

export default GameBoard;