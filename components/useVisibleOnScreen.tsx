'use client';

import { useEffect, useRef, useState } from 'react';

export function useVisibleOnScreen<T extends HTMLElement = HTMLElement>(options?: IntersectionObserverInit) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Vérifier si on est sur mobile
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      // Sur desktop, ne pas déclencher automatiquement
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Une fois visible, on peut arrêter d'observer
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.3, // Déclenche quand 30% du bouton est visible
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [ref, isVisible] as const;
}
