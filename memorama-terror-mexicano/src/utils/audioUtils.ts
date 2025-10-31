// Audio utilities for the memorama game

// Generate simple beep sounds using Web Audio API as fallback
export const generateBeepSound = (frequency: number, duration: number, type: OscillatorType = 'sine'): Promise<void> => {
  return new Promise((resolve) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      
      // Mejorar el envelope del sonido
      const now = audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01); // Attack rápido
      gainNode.gain.exponentialRampToValueAtTime(0.1, now + duration * 0.7); // Sustain
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration); // Release
      
      oscillator.start(now);
      oscillator.stop(now + duration);
      
      oscillator.onended = () => {
        audioContext.close();
        resolve();
      };
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
      resolve();
    }
  });
};

// Predefined sound configurations
export const SOUND_PRESETS = {
  whisper: { frequency: 300, duration: 0.2, type: 'sine' as OscillatorType },
  creak: { frequency: 180, duration: 0.3, type: 'sawtooth' as OscillatorType },
  bell: { frequency: 800, duration: 0.5, type: 'sine' as OscillatorType },
  chime: { frequency: 1200, duration: 0.4, type: 'triangle' as OscillatorType },
  success: { frequency: 660, duration: 0.6, type: 'sine' as OscillatorType },
  victory: { frequency: 523, duration: 1.0, type: 'triangle' as OscillatorType }
};

// Generate a chord sound for success/match sounds
export const generateChordSound = (frequencies: number[], duration: number): Promise<void> => {
  return new Promise((resolve) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const gainNode = audioContext.createGain();
      gainNode.connect(audioContext.destination);
      
      const now = audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.05, now + duration * 0.8);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
      
      // Crear múltiples osciladores para el acorde
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        oscillator.connect(gainNode);
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        oscillator.start(now + index * 0.05); // Pequeño delay entre notas
        oscillator.stop(now + duration);
      });
      
      setTimeout(() => {
        audioContext.close();
        resolve();
      }, duration * 1000 + 100);
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
      resolve();
    }
  });
};

// Play a preset sound
export const playPresetSound = (preset: keyof typeof SOUND_PRESETS): Promise<void> => {
  const config = SOUND_PRESETS[preset];
  
  // Usar acordes para sonidos de éxito
  if (preset === 'bell' || preset === 'chime' || preset === 'success') {
    const baseFreq = config.frequency;
    const chord = [baseFreq, baseFreq * 1.25, baseFreq * 1.5]; // Acorde mayor
    return generateChordSound(chord, config.duration);
  }
  
  return generateBeepSound(config.frequency, config.duration, config.type);
};

// Create audio file URLs (for when actual files are available)
export const createAudioFileUrl = (path: string): string => {
  return new URL(path, window.location.origin).href;
};

// Check if an audio file exists
export const checkAudioFileExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};