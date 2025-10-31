import React from 'react';
import { motion } from 'framer-motion';
import { GameProvider, useGameContext } from './context';
import GameBoard from './components/GameBoard';
import ScorePanel from './components/ScorePanel';
import CharacterModal from './components/CharacterModal';
import VictoryModal from './components/VictoryModal';

// Componente principal del juego (dentro del contexto)
const GameApp: React.FC = () => {
  const {
    gameState,
    audioState,
    timerState,
    selectedCharacter,
    isCharacterModalOpen,
    gameStats,
    handleCardClick,
    startNewGame,
    closeCharacterModal,
    showCharacterModal
  } = useGameContext();

  // Determinar si el tablero debe estar deshabilitado
  const isBoardDisabled = gameState.flippedCards.length >= 2 || 
                         gameState.gameComplete;

  // Convertir tiempo de milisegundos a segundos para ScorePanel
  const elapsedTimeInSeconds = Math.floor(timerState.elapsedTime / 1000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-mexican-purple via-blood-red to-mexican-purple relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-pulse-slow">💀</div>
        <div className="absolute top-20 right-20 text-4xl animate-bounce-subtle">🌺</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-pulse-slow" style={{ animationDelay: '1s' }}>👻</div>
        <div className="absolute bottom-10 right-10 text-4xl animate-bounce-subtle" style={{ animationDelay: '2s' }}>🕯️</div>
        <div className="absolute top-1/2 left-5 text-3xl animate-pulse-slow" style={{ animationDelay: '0.5s' }}>🦇</div>
        <div className="absolute top-1/3 right-5 text-3xl animate-bounce-subtle" style={{ animationDelay: '1.5s' }}>🌙</div>
      </div>

      {/* Patrón de fondo sutil */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm20 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header orgánico inspirado en Día de Muertos */}
        <motion.header 
          className="relative py-8 px-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Decoración superior flotante */}
            <motion.div 
              className="flex justify-center items-center mb-6 space-x-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <motion.span 
                className="text-2xl"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🌼
              </motion.span>
              <motion.span 
                className="text-3xl"
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                💀
              </motion.span>
              <motion.span 
                className="text-2xl"
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                🌺
              </motion.span>
            </motion.div>

            {/* Título principal con efecto orgánico */}
            <motion.div className="relative mb-4">
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-creepy tracking-wide relative z-10"
                style={{ 
                  background: 'linear-gradient(45deg, #FF6B35 0%, #FFD700 30%, #FF1493 60%, #8A2BE2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(3px 3px 8px rgba(255,107,53,0.3))'
                }}
                whileHover={{ 
                  scale: 1.05,
                  filter: 'drop-shadow(4px 4px 12px rgba(255,107,53,0.5))'
                }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                Memorama
              </motion.h1>
              
              {/* Subtítulo integrado de forma orgánica */}
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl font-creepy tracking-wider mt-2"
                style={{ 
                  background: 'linear-gradient(45deg, #8A2BE2 0%, #FF1493 50%, #FFD700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(2px 2px 6px rgba(138,43,226,0.3))'
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                whileHover={{ 
                  scale: 1.03,
                  filter: 'drop-shadow(3px 3px 9px rgba(138,43,226,0.5))'
                }}
              >
                Terror Mexicano
              </motion.h2>

              {/* Efecto de resplandor detrás del título */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 blur-3xl -z-10"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Descripción poética */}
            <motion.p 
              className="text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-6"
              style={{ 
                color: '#FFB347',
                textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Donde las leyendas cobran vida y la memoria se convierte en magia
            </motion.p>
            
            {/* Elementos decorativos flotantes en disposición orgánica */}
            <motion.div 
              className="flex flex-wrap justify-center items-center gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.div 
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 backdrop-blur-sm rounded-full px-4 py-2 border border-orange-300/40"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(255, 165, 0, 0.2)'
                }}
                animate={{
                  y: [0, -3, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="text-lg">🎭</span>
                <span className="text-sm font-semibold" style={{ color: '#FFD700' }}>
                  Tradición
                </span>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-500/30 to-rose-500/30 backdrop-blur-sm rounded-full px-4 py-2 border border-pink-300/40"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(255, 192, 203, 0.2)'
                }}
                animate={{
                  y: [0, -3, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <span className="text-lg">🧠</span>
                <span className="text-sm font-semibold" style={{ color: '#FFB6C1' }}>
                  Memoria
                </span>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-300/40"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(221, 160, 221, 0.2)'
                }}
                animate={{
                  y: [0, -3, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <span className="text-lg">👻</span>
                <span className="text-sm font-semibold" style={{ color: '#DDA0DD' }}>
                  Misterio
                </span>
              </motion.div>
            </motion.div>

            {/* Decoración inferior con elementos flotantes */}
            <motion.div 
              className="flex justify-center items-center mt-6 space-x-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <motion.span 
                className="text-xl opacity-60"
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🕯️
              </motion.span>
              <motion.span 
                className="text-2xl opacity-70"
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, -10, 10, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              >
                ✨
              </motion.span>
              <motion.span 
                className="text-xl opacity-60"
                animate={{ 
                  rotate: [0, -15, 15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                🦋
              </motion.span>
            </motion.div>
          </div>
        </motion.header>

        {/* Área principal del juego - con flex-1 para ocupar espacio disponible */}
        <main className="flex-1 flex flex-col items-center px-4 py-4 space-y-4 min-h-0">
          {/* Panel de puntuación */}
          <ScorePanel
            matchedPairs={gameState.matchedPairs}
            attempts={gameState.attempts}
            elapsedTime={elapsedTimeInSeconds}
            onNewGame={startNewGame}
          />

          {/* Tablero de juego - tamaño optimizado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-lg sm:max-w-xl md:max-w-2xl"
          >
            <GameBoard
              cards={gameState.cards}
              onCardClick={handleCardClick}
              disabled={isBoardDisabled}
            />
          </motion.div>

        </main>

        {/* Controles de audio - Sección separada */}
        <motion.section
          className="flex flex-col items-center justify-center space-y-3 px-4 py-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{marginTop: '20px'}}
        >
          <button
            onClick={audioState.toggleSound}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
              audioState.soundEnabled
                ? 'bg-mexican-gold text-mexican-purple border-mexican-gold hover:bg-yellow-400'
                : 'bg-transparent text-bone-white border-bone-white hover:bg-bone-white hover:text-mexican-purple'
            }`}
          >
            <span className="text-lg">
              {audioState.soundEnabled ? '🔊' : '🔇'}
            </span>
            <span className="font-semibold text-sm">
              {audioState.soundEnabled ? 'Sonido ON' : 'Sonido OFF'}
            </span>
          </button>

          {/* Indicador de carga de audio */}
          {!audioState.isLoaded && (
            <motion.div
              className="text-xs opacity-70"
              style={{ color: '#F5F5DC' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Cargando efectos de sonido...
            </motion.div>
          )}
        </motion.section>

        {/* Footer - más compacto */}
        <motion.footer 
          className="text-center py-4 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-xs opacity-60 font-body" style={{ color: '#F5F5DC' }}>
            Hecho con 💀 para celebrar la cultura mexicana
          </p>
        </motion.footer>
      </div>

      {/* Modal de personaje */}
      <CharacterModal
        character={selectedCharacter}
        isOpen={isCharacterModalOpen}
        onClose={closeCharacterModal}
      />

      {/* Modal de victoria */}
      <VictoryModal
        isOpen={gameState.gameComplete}
        stats={gameStats}
        onNewGame={startNewGame}
      />
    </div>
  );
};

// Componente App principal con proveedor de contexto
const App: React.FC = () => {
  return (
    <GameProvider>
      <GameApp />
    </GameProvider>
  );
};

export default App;
