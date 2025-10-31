import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CharacterModalProps } from '../types/game';

const CharacterModal: React.FC<CharacterModalProps> = React.memo(({ character, isOpen, onClose }) => {
  if (!character) return null;

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 300,
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-gradient-to-br from-mexican-purple to-blood-red rounded-2xl shadow-2xl max-w-md w-full mx-4 border-4 border-mexican-gold"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with decorative elements */}
            <div className="relative p-6 text-center border-b-2 border-mexican-gold">
              <div className="absolute top-2 left-2 text-mexican-gold text-2xl">💀</div>
              <div className="absolute top-2 right-2 text-mexican-gold text-2xl">💀</div>
              <h2 className="text-2xl font-creepy text-bone-white mb-2">
                ¡Par Encontrado!
              </h2>
              <div className="w-16 h-1 bg-mexican-gold mx-auto rounded-full"></div>
            </div>

            {/* Character Image */}
            <div className="flex justify-center p-6 pb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-mexican-gold rounded-full blur-lg opacity-30 animate-pulse-slow"></div>
                <img
                  src={character.image}
                  alt={character.name}
                  className="relative w-32 h-32 object-cover rounded-full border-4 border-mexican-gold shadow-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjMkQxQjY5Ii8+Cjx0ZXh0IHg9IjY0IiB5PSI3MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjQ4IiBmaWxsPSIjRkZENzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5KAIC8+Cjwvc3ZnPgo=';
                  }}
                />
              </div>
            </div>

            {/* Character Information */}
            <div className="px-6 pb-6 space-y-4">
              {/* Name and Origin */}
              <div className="text-center">
                <h3 className="text-3xl font-creepy text-mexican-gold mb-2">
                  {character.name}
                </h3>
                <p className="text-bone-white text-sm font-semibold bg-black bg-opacity-30 rounded-full px-3 py-1 inline-block">
                  {character.origin} • {character.region}
                </p>
              </div>

              {/* Story */}
              <div className="bg-black bg-opacity-30 rounded-lg p-4 border border-mexican-gold border-opacity-30">
                <h4 className="text-mexican-gold font-semibold mb-2 text-center">
                  📖 Historia
                </h4>
                <p className="text-bone-white text-sm leading-relaxed text-center">
                  {character.story}
                </p>
              </div>

              {/* Category Badge */}
              <div className="flex justify-center">
                <span className="bg-mexican-orange text-bone-white px-4 py-2 rounded-full text-sm font-semibold capitalize shadow-lg">
                  {character.category}
                </span>
              </div>
            </div>

            {/* Close Button */}
            <div className="p-6 pt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-full bg-mexican-gold hover:bg-yellow-400 text-mexican-purple font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg"
              >
                Continuar Jugando
              </motion.button>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute -top-2 -left-2 text-mexican-gold text-3xl animate-bounce-subtle">🌺</div>
            <div className="absolute -top-2 -right-2 text-mexican-gold text-3xl animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>🌺</div>
            <div className="absolute -bottom-2 -left-2 text-mexican-gold text-3xl animate-bounce-subtle" style={{ animationDelay: '1s' }}>🌺</div>
            <div className="absolute -bottom-2 -right-2 text-mexican-gold text-3xl animate-bounce-subtle" style={{ animationDelay: '1.5s' }}>🌺</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

CharacterModal.displayName = 'CharacterModal';

export default CharacterModal;