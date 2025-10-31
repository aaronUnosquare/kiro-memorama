import { useState, useCallback, useEffect, useRef } from 'react';
import type { AudioState, SoundType } from '../types/game';
import { playPresetSound } from '../utils/audioUtils';



// Pool de objetos Audio para reutilización
interface AudioPool {
  [key: string]: HTMLAudioElement[];
}

export const useAudio = (): AudioState => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const audioPoolRef = useRef<AudioPool>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(true); // Cambiar a true por defecto
  const [useFallback, setUseFallback] = useState<boolean>(true); // Usar fallback por defecto

  // Precargar archivos de audio con fallback
  const preloadAudio = useCallback(async () => {
    // Usar directamente el sistema fallback para mayor confiabilidad
    console.info('Usando sistema de audio fallback (Web Audio API)');
    setUseFallback(true);
    setIsLoaded(true);
  }, []);

  // Reproducir sonido aleatorio de un tipo específico
  const playSound = useCallback(async (soundType: SoundType) => {
    if (!soundEnabled || !isLoaded) return;
    
    if (useFallback) {
      // Usar Web Audio API como fallback
      const soundMap: Record<SoundType, string[]> = {
        flip: ['whisper', 'creak'],
        match: ['bell', 'chime'],
        victory: ['victory']
      };
      
      const presets = soundMap[soundType] || ['bell'];
      const randomPreset = presets[Math.floor(Math.random() * presets.length)];
      
      try {
        await playPresetSound(randomPreset as any);
      } catch (error) {
        console.warn('Error al reproducir sonido fallback:', error);
      }
      return;
    }
    
    const soundPool = audioPoolRef.current[soundType];
    if (!soundPool || soundPool.length === 0) return;
    
    // Seleccionar sonido aleatorio del pool
    const randomIndex = Math.floor(Math.random() * soundPool.length);
    const audio = soundPool[randomIndex];
    
    // Reiniciar el audio si ya se está reproduciendo
    if (!audio.paused) {
      audio.currentTime = 0;
    }
    
    // Reproducir con manejo de errores
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn('Error al reproducir audio:', error);
      });
    }
  }, [soundEnabled, isLoaded, useFallback]);

  // Reproducir sonido de voltear carta
  const playFlipSound = useCallback(() => {
    playSound('flip');
  }, [playSound]);

  // Reproducir sonido de par exitoso
  const playMatchSound = useCallback(() => {
    playSound('match');
  }, [playSound]);

  // Reproducir sonido de victoria
  const playVictorySound = useCallback(() => {
    playSound('victory');
  }, [playSound]);

  // Toggle para activar/desactivar sonido
  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  // Establecer volumen general
  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    
    Object.values(audioPoolRef.current).forEach(soundPool => {
      soundPool.forEach(audio => {
        audio.volume = clampedVolume;
      });
    });
  }, []);

  // Pausar todos los sonidos
  const pauseAllSounds = useCallback(() => {
    Object.values(audioPoolRef.current).forEach(soundPool => {
      soundPool.forEach(audio => {
        if (!audio.paused) {
          audio.pause();
        }
      });
    });
  }, []);

  // Detener todos los sonidos
  const stopAllSounds = useCallback(() => {
    Object.values(audioPoolRef.current).forEach(soundPool => {
      soundPool.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    });
  }, []);

  // Precargar audio al montar el componente
  useEffect(() => {
    preloadAudio();
    
    // Cleanup al desmontar
    return () => {
      stopAllSounds();
    };
  }, [preloadAudio, stopAllSounds]);

  // Manejar cambios de visibilidad de la página
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseAllSounds();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pauseAllSounds]);

  return {
    soundEnabled,
    playFlipSound,
    playMatchSound,
    toggleSound,
    
    // Funciones adicionales útiles
    playVictorySound,
    setVolume,
    pauseAllSounds,
    stopAllSounds,
    isLoaded
  };
};