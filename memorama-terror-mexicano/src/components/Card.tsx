import React from 'react';
import { motion } from 'framer-motion';
import type { CardProps } from '../types/game';
import LazyImage from './LazyImage';

const Card: React.FC<CardProps> = React.memo(({ card, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched && !card.isBlocked) {
      onClick();
    }
  };

  // Variantes de animación para el volteo de carta
  const cardVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 }
  };

  // Configuración de transición para el volteo
  const flipTransition = { duration: 0.6 };

  const isFlipped = card.isFlipped || card.isMatched;
  const isClickable = !disabled && !card.isFlipped && !card.isMatched && !card.isBlocked;

  return (
    <motion.div
      className="relative w-full aspect-square cursor-pointer perspective-1000"
      onClick={handleClick}
      whileHover={isClickable ? { scale: 1.05 } : {}}
      whileTap={isClickable ? { scale: 0.95 } : {}}
      animate={card.isMatched ? { 
        scale: [1, 1.1, 1],
        transition: { duration: 0.8 }
      } : {}}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={isFlipped ? "front" : "back"}
        variants={cardVariants}
        transition={flipTransition}
      >
        {/* Frente de la carta (personaje) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden shadow-lg">
          <div className="w-full h-full bg-gradient-to-br from-mexican-purple to-mexican-orange p-1 sm:p-2">
            <div className="w-full h-full bg-bone-white rounded-lg flex flex-col items-center justify-center relative overflow-hidden p-1">
              {/* Imagen del personaje - responsive y adaptable */}
              <div className="flex-1 w-full flex items-center justify-center mb-1 p-1">
                <div className="w-full h-full relative flex items-center justify-center">
                  <LazyImage
                    src={card.character.image}
                    alt={card.character.name}
                    className="w-full h-full object-contain rounded-lg border-2 border-mexican-gold shadow-md"
                  />
                </div>
              </div>
              
              {/* Nombre del personaje */}
              <div className="w-full px-1">
                <h3 className="text-[0.6rem] sm:text-xs font-bold text-mexican-purple text-center leading-tight truncate">
                  {card.character.name}
                </h3>
              </div>
              
              {/* Decoración de esquinas */}
              <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-mexican-gold"></div>
              <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-mexican-gold"></div>
              <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-mexican-gold"></div>
              <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-mexican-gold"></div>
            </div>
          </div>
        </div>

        {/* Reverso de la carta (diseño mexicano) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden shadow-lg rotate-y-180">
          <img
            src="/assets/images/ui/card-back.svg"
            alt="Reverso de carta"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback si la imagen SVG no carga
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-full bg-gradient-to-br from-red-800 to-red-900 p-2">
                    <div class="w-full h-full bg-gradient-to-br from-purple-800 to-orange-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div class="text-yellow-400 text-4xl">💀</div>
                    </div>
                  </div>
                `;
              }
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
});

Card.displayName = 'Card';

export default Card;