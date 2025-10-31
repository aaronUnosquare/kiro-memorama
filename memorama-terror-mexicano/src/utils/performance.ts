// Performance optimization utilities

// Debounce function to limit rapid function calls
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function to limit function calls to once per interval
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Preload images for better performance
export const preloadImages = (imageUrls: string[]): Promise<void[]> => {
  const promises = imageUrls.map((url) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => {
        console.warn(`Failed to preload image: ${url}`);
        resolve(); // Resolve anyway to not block other images
      };
      img.src = url;
    });
  });
  
  return Promise.all(promises);
};

// Memory cleanup utility
export const cleanupResources = (elements: (HTMLElement | null)[]): void => {
  elements.forEach((element) => {
    if (element) {
      // Remove event listeners
      element.removeEventListener('click', () => {});
      element.removeEventListener('load', () => {});
      element.removeEventListener('error', () => {});
      
      // Clear any timers or intervals associated with the element
      const timerId = element.dataset.timerId;
      if (timerId) {
        clearTimeout(parseInt(timerId));
        clearInterval(parseInt(timerId));
      }
    }
  });
};

// Check if device has limited resources
export const isLowEndDevice = (): boolean => {
  // Check for various indicators of low-end devices
  const navigator = window.navigator as any;
  
  // Check memory (if available)
  if (navigator.deviceMemory && navigator.deviceMemory < 4) {
    return true;
  }
  
  // Check connection (if available)
  if (navigator.connection) {
    const connection = navigator.connection;
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return true;
    }
  }
  
  // Check hardware concurrency (CPU cores)
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    return true;
  }
  
  return false;
};

// Optimize animations based on device capabilities
export const getOptimizedAnimationConfig = () => {
  const isLowEnd = isLowEndDevice();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (isLowEnd || prefersReducedMotion) {
    return {
      duration: 0.2,
      ease: 'linear',
      staggerChildren: 0.05,
      enableComplexAnimations: false,
    };
  }
  
  return {
    duration: 0.6,
    ease: 'easeOut',
    staggerChildren: 0.1,
    enableComplexAnimations: true,
  };
};

// Lazy load utility for heavy components
export const createLazyComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) => {
  return React.lazy(importFunc);
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void): void => {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(`${name}-start`);
    fn();
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    
    // Log performance in development
    if (import.meta.env.DEV) {
      const measure = performance.getEntriesByName(name)[0];
      console.log(`Performance: ${name} took ${measure.duration.toFixed(2)}ms`);
    }
  } else {
    fn();
  }
};

// Import React for lazy component creation
import React from 'react';