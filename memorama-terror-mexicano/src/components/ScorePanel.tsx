import React from 'react';
import { motion } from 'framer-motion';
import type { ScorePanelProps } from '../types/game';

const ScorePanel: React.FC<ScorePanelProps> = React.memo(({ 
  matchedPairs, 
  attempts, 
  elapsedTime, 
  onNewGame 
}) => {
  // Formatear el tiempo transcurrido
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Variantes de animación para el panel
  const panelVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  // Configuración de transición para el panel
  const panelTransition = { duration: 0.5 };

  // Variantes de animación para números
  const numberVariants = {
    update: {
      scale: [1, 1.1, 1],
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto mb-6"
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      transition={panelTransition}
    >
      {/* Contenedor principal orgánico */}
      <div className="relative">
        
        {/* Elementos flotantes de estadísticas en disposición orgánica */}
        <div className="relative flex flex-wrap justify-center items-center gap-6 mb-8">
          
          {/* Pares encontrados - Flotante izquierda */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -30, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            whileHover={{ 
              scale: 1.05, 
              rotate: 2,
              y: -8
            }}
          >
            <div 
              className="backdrop-blur-xl rounded-3xl p-6 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.2) 0%, rgba(123, 31, 162, 0.3) 100%)',
                boxShadow: `
                  0 8px 32px rgba(156, 39, 176, 0.2),
                  0 2px 16px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `,
                border: '1px solid rgba(156, 39, 176, 0.3)',
                minWidth: '160px'
              }}
            >
              <div className="text-center space-y-2">
                <div 
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3"
                  style={{
                    background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
                    boxShadow: '0 6px 20px rgba(156, 39, 176, 0.4)'
                  }}
                >
                  <span className="text-white text-2xl">🎯</span>
                </div>
                <div className="text-xs font-medium text-purple-200 uppercase tracking-wider">
                  Pares
                </div>
                <motion.div 
                  className="text-3xl font-bold text-white"
                  key={matchedPairs}
                  variants={numberVariants}
                  animate="update"
                >
                  {matchedPairs}<span className="text-xl text-purple-300">/8</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Tiempo - Flotante centro superior */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: -30, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ 
              scale: 1.05, 
              rotate: -2,
              y: -8
            }}
          >
            <div 
              className="backdrop-blur-xl rounded-3xl p-6 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.2) 0%, rgba(245, 124, 0, 0.3) 100%)',
                boxShadow: `
                  0 8px 32px rgba(255, 152, 0, 0.2),
                  0 2px 16px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `,
                border: '1px solid rgba(255, 152, 0, 0.3)',
                minWidth: '160px'
              }}
            >
              <div className="text-center space-y-2">
                <div 
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3"
                  style={{
                    background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
                    boxShadow: '0 6px 20px rgba(255, 152, 0, 0.4)'
                  }}
                >
                  <span className="text-white text-2xl">⏱️</span>
                </div>
                <div className="text-xs font-medium text-orange-200 uppercase tracking-wider">
                  Tiempo
                </div>
                <motion.div 
                  className="text-3xl font-bold text-white font-mono"
                  key={elapsedTime}
                  variants={numberVariants}
                  animate="update"
                >
                  {formatTime(elapsedTime)}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Intentos - Flotante derecha */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 30, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ 
              scale: 1.05, 
              rotate: -3,
              y: -8
            }}
          >
            <div 
              className="backdrop-blur-xl rounded-3xl p-6 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.2) 0%, rgba(211, 47, 47, 0.3) 100%)',
                boxShadow: `
                  0 8px 32px rgba(244, 67, 54, 0.2),
                  0 2px 16px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `,
                border: '1px solid rgba(244, 67, 54, 0.3)',
                minWidth: '160px'
              }}
            >
              <div className="text-center space-y-2">
                <div 
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3"
                  style={{
                    background: 'linear-gradient(135deg, #F44336 0%, #D32F2F 100%)',
                    boxShadow: '0 6px 20px rgba(244, 67, 54, 0.4)'
                  }}
                >
                  <span className="text-white text-2xl">🎲</span>
                </div>
                <div className="text-xs font-medium text-red-200 uppercase tracking-wider">
                  Intentos
                </div>
                <motion.div 
                  className="text-3xl font-bold text-white"
                  key={attempts}
                  variants={numberVariants}
                  animate="update"
                >
                  {attempts}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>



        {/* Botón Nueva Partida - Flotante central */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.button
            onClick={onNewGame}
            className="relative overflow-hidden rounded-2xl px-6 py-3 group"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.9) 0%, rgba(255, 152, 0, 0.9) 100%)',
              boxShadow: `
                0 4px 16px rgba(255, 193, 7, 0.3),
                0 1px 8px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.3)
              `,
              border: '1px solid rgba(255, 193, 7, 0.4)'
            }}
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: `
                0 6px 20px rgba(255, 193, 7, 0.4),
                0 2px 10px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.4)
              `
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">🔄</span>
              <div className="text-center">
                <div className="text-sm font-bold text-black">
                  Nueva Partida
                </div>
              </div>
            </div>
            
            {/* Efecto de brillo sutil */}
            <motion.div
              className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl"
            />
          </motion.button>
        </motion.div>

        {/* Elementos decorativos flotantes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 text-2xl opacity-30"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute top-20 right-20 text-2xl opacity-30"
            animate={{
              y: [0, -15, 0],
              rotate: [0, -10, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            🌟
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-20 text-2xl opacity-30"
            animate={{
              y: [0, -8, 0],
              rotate: [0, 15, 0]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            💫
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

ScorePanel.displayName = 'ScorePanel';

export default ScorePanel;