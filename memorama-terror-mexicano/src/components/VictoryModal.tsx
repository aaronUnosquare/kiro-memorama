import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { VictoryModalProps } from '../types/game';

const VictoryModal: React.FC<VictoryModalProps> = React.memo(({ isOpen, stats, onNewGame }) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getPerformanceMessage = (efficiency: number): string => {
    if (efficiency >= 90) return "¡Memoria de Catrina! 💀✨";
    if (efficiency >= 75) return "¡Excelente! 🌟";
    if (efficiency >= 60) return "¡Muy bien! 👏";
    if (efficiency >= 45) return "¡Buen trabajo! 👍";
    return "¡Sigue practicando! 💪";
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotateY: -180
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 200,
        duration: 0.6
      }
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      rotateY: 180,
      transition: {
        duration: 0.4
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const celebrationVariants = {
    animate: {
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  const fireworkVariants = {
    animate: {
      scale: [0, 1.5, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 0.5
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Animated Background */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-gradient-to-br from-mexican-purple via-blood-red to-mexican-purple opacity-95"
          />

          {/* Firework Effects */}
          <motion.div
            variants={fireworkVariants}
            animate="animate"
            className="absolute top-20 left-20 w-8 h-8 bg-mexican-gold rounded-full opacity-60"
          />
          <motion.div
            variants={fireworkVariants}
            animate="animate"
            className="absolute top-32 right-24 w-6 h-6 bg-mexican-orange rounded-full opacity-60"
            style={{ animationDelay: '0.3s' }}
          />
          <motion.div
            variants={fireworkVariants}
            animate="animate"
            className="absolute bottom-32 left-32 w-10 h-10 bg-bone-white rounded-full opacity-40"
            style={{ animationDelay: '0.7s' }}
          />
          <motion.div
            variants={fireworkVariants}
            animate="animate"
            className="absolute bottom-20 right-20 w-7 h-7 bg-mexican-gold rounded-full opacity-50"
            style={{ animationDelay: '1s' }}
          />
          
          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-gradient-to-br from-bone-white to-gray-100 rounded-3xl shadow-2xl max-w-lg w-full mx-4 border-8 border-mexican-gold overflow-hidden"
          >
            {/* Decorative Header */}
            <div className="relative bg-gradient-to-r from-mexican-gold to-mexican-orange p-6 text-center">
              <motion.div
                variants={celebrationVariants}
                animate="animate"
                className="text-6xl mb-2"
              >
                🎉
              </motion.div>
              <h2 className="text-4xl font-creepy text-mexican-purple mb-2">
                ¡Felicidades!
              </h2>
              <p className="text-mexican-purple font-semibold text-lg">
                Has completado el Memorama del Terror Mexicano
              </p>
              
              {/* Decorative skulls */}
              <div className="absolute top-4 left-4 text-mexican-purple text-3xl animate-pulse">💀</div>
              <div className="absolute top-4 right-4 text-mexican-purple text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>💀</div>
            </div>

            {/* Stats Section */}
            <div className="p-8 space-y-6">
              {/* Performance Message */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="text-2xl font-bold text-mexican-purple mb-4"
                >
                  {getPerformanceMessage(stats.efficiency)}
                </motion.div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-mexican-purple to-blood-red rounded-xl p-4 text-center border-2 border-mexican-gold"
                >
                  <div className="text-3xl mb-2">⏱️</div>
                  <div className="text-bone-white font-bold text-xl">
                    {formatTime(stats.totalTime)}
                  </div>
                  <div className="text-bone-white text-sm opacity-90">
                    Tiempo Total
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-mexican-orange to-mexican-gold rounded-xl p-4 text-center border-2 border-mexican-purple"
                >
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-mexican-purple font-bold text-xl">
                    {stats.totalAttempts}
                  </div>
                  <div className="text-mexican-purple text-sm opacity-90">
                    Intentos
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-mexican-gold to-bone-white rounded-xl p-4 text-center border-2 border-mexican-orange"
                >
                  <div className="text-3xl mb-2">💑</div>
                  <div className="text-mexican-purple font-bold text-xl">
                    {stats.matchedPairs}/8
                  </div>
                  <div className="text-mexican-purple text-sm opacity-90">
                    Pares Encontrados
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-gradient-to-br from-blood-red to-mexican-purple rounded-xl p-4 text-center border-2 border-bone-white"
                >
                  <div className="text-3xl mb-2">📊</div>
                  <div className="text-bone-white font-bold text-xl">
                    {Math.round(stats.efficiency)}%
                  </div>
                  <div className="text-bone-white text-sm opacity-90">
                    Eficiencia
                  </div>
                </motion.div>
              </div>

              {/* Motivational Message */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-r from-mexican-purple to-blood-red rounded-lg p-4 text-center border-2 border-mexican-gold"
              >
                <p className="text-bone-white text-sm leading-relaxed">
                  Has explorado las leyendas del terror mexicano y ejercitado tu memoria. 
                  ¡Los espíritus ancestrales están orgullosos de tu dedicación! 👻✨
                </p>
              </motion.div>

              {/* New Game Button */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                className="pt-4"
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(255, 215, 0, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onNewGame}
                  className="w-full bg-gradient-to-r from-mexican-gold to-mexican-orange hover:from-mexican-orange hover:to-mexican-gold text-mexican-purple font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg text-lg border-2 border-mexican-purple"
                >
                  🎮 Nueva Partida
                </motion.button>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-4xl"
              >
                🌟
              </motion.div>
            </div>
            
            {/* Corner decorations */}
            <div className="absolute top-2 left-2 text-mexican-gold text-2xl animate-pulse">🌺</div>
            <div className="absolute top-2 right-2 text-mexican-gold text-2xl animate-pulse" style={{ animationDelay: '0.3s' }}>🌺</div>
            <div className="absolute bottom-2 left-2 text-mexican-gold text-2xl animate-pulse" style={{ animationDelay: '0.6s' }}>🌺</div>
            <div className="absolute bottom-2 right-2 text-mexican-gold text-2xl animate-pulse" style={{ animationDelay: '0.9s' }}>🌺</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

VictoryModal.displayName = 'VictoryModal';

export default VictoryModal;