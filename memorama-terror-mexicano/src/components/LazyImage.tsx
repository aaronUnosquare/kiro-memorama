import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = '/assets/images/ui/placeholder-character.svg',
  onError 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    if (onError) {
      onError(e);
    } else {
      // Usar fallback automático
      const target = e.target as HTMLImageElement;
      if (target.src !== fallbackSrc) {
        target.src = fallbackSrc;
        setHasError(false);
      }
    }
  };

  return (
    <div className={`relative w-full h-full ${className}`} ref={imgRef}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          style={{ 
            objectFit: 'contain',
            maxWidth: '100%',
            maxHeight: '100%'
          }}
        />
      )}
      
      {/* Placeholder mientras carga */}
      {!isLoaded && isInView && (
        <div className={`absolute inset-0 bg-gradient-to-br from-purple-100 to-orange-100 animate-pulse rounded flex items-center justify-center`}>
          <div className="text-purple-400 text-2xl">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
      
      {/* Fallback si no está en vista */}
      {!isInView && (
        <div className={`w-full h-full bg-gradient-to-br from-purple-50 to-orange-50 rounded flex items-center justify-center`}>
          <div className="text-purple-300 text-xl">
            💀
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;