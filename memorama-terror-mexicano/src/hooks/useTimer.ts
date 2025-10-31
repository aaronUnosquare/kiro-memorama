import { useState, useEffect, useCallback, useRef } from 'react';

interface TimerState {
  elapsedTime: number;
  isRunning: boolean;
  startTime: Date | null;
}

export const useTimer = () => {
  const [timerState, setTimerState] = useState<TimerState>({
    elapsedTime: 0,
    isRunning: false,
    startTime: null
  });
  
  const intervalRef = useRef<number | null>(null);

  // Iniciar el cronómetro
  const startTimer = useCallback(() => {
    const now = new Date();
    setTimerState(prevState => ({
      ...prevState,
      isRunning: true,
      startTime: now,
      elapsedTime: 0
    }));
  }, []);

  // Pausar el cronómetro
  const pauseTimer = useCallback(() => {
    setTimerState(prevState => ({
      ...prevState,
      isRunning: false
    }));
  }, []);

  // Reanudar el cronómetro
  const resumeTimer = useCallback(() => {
    setTimerState(prevState => ({
      ...prevState,
      isRunning: true
    }));
  }, []);

  // Reiniciar el cronómetro
  const resetTimer = useCallback(() => {
    setTimerState({
      elapsedTime: 0,
      isRunning: false,
      startTime: null
    });
  }, []);

  // Detener completamente el cronómetro
  const stopTimer = useCallback(() => {
    setTimerState(prevState => ({
      ...prevState,
      isRunning: false
    }));
  }, []);

  // Efecto para actualizar el tiempo transcurrido
  useEffect(() => {
    if (timerState.isRunning && timerState.startTime) {
      intervalRef.current = setInterval(() => {
        setTimerState(prevState => {
          if (!prevState.startTime || !prevState.isRunning) {
            return prevState;
          }
          
          const now = new Date();
          const elapsed = now.getTime() - prevState.startTime.getTime();
          
          return {
            ...prevState,
            elapsedTime: elapsed
          };
        });
      }, 100); // Actualizar cada 100ms para mayor precisión
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup al desmontar el componente
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timerState.isRunning, timerState.startTime]);

  // Formatear tiempo en formato MM:SS
  const formatTime = useCallback((milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // Formatear tiempo con milisegundos MM:SS.mmm
  const formatTimeWithMilliseconds = useCallback((milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10); // Solo dos dígitos de milisegundos
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  }, []);

  // Obtener tiempo en diferentes formatos
  const getFormattedTime = useCallback(() => {
    return formatTime(timerState.elapsedTime);
  }, [timerState.elapsedTime, formatTime]);

  const getFormattedTimeWithMs = useCallback(() => {
    return formatTimeWithMilliseconds(timerState.elapsedTime);
  }, [timerState.elapsedTime, formatTimeWithMilliseconds]);

  // Obtener tiempo en segundos
  const getTimeInSeconds = useCallback(() => {
    return Math.floor(timerState.elapsedTime / 1000);
  }, [timerState.elapsedTime]);

  return {
    // Estado del cronómetro
    elapsedTime: timerState.elapsedTime,
    isRunning: timerState.isRunning,
    startTime: timerState.startTime,
    
    // Controles del cronómetro
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    stopTimer,
    
    // Utilidades de formato
    getFormattedTime,
    getFormattedTimeWithMs,
    getTimeInSeconds,
    formatTime,
    formatTimeWithMilliseconds
  };
};