// src/hooks/useCarousel.js
import { useEffect, useReducer, useCallback, useRef } from 'react';

const carouselReducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_SLIDE':
      return {
        ...state,
        currentIndex: (state.currentIndex + 1) % action.payload,
        direction: 'next',
      };
    case 'PREV_SLIDE':
      return {
        ...state,
        currentIndex: (state.currentIndex - 1 + action.payload) % action.payload,
        direction: 'prev',
      };
    case 'SET_SLIDE':
      return {
        ...state,
        currentIndex: action.payload,
        direction: action.payload > state.currentIndex ? 'next' : 'prev',
      };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    case 'PLAY':
      return { ...state, isPlaying: true };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const useCarousel = (slides, interval = 5000) => {
  const [state, dispatch] = useReducer(carouselReducer, {
    currentIndex: 0,
    direction: 'next',
    isPlaying: true,
  });
  const carouselRef = useRef(null);

  const slideCount = slides.length;

  const nextSlide = useCallback(() => {
    dispatch({ type: 'NEXT_SLIDE', payload: slideCount });
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    dispatch({ type: 'PREV_SLIDE', payload: slideCount });
  }, [slideCount]);

  const setSlide = useCallback((index) => {
    dispatch({ type: 'SET_SLIDE', payload: index });
  }, []);

  // Intersection Observer para pausar/reanudar el auto-play
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          dispatch({ type: 'PLAY' });
        } else {
          dispatch({ type: 'PAUSE' });
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = carouselRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Auto-play
  useEffect(() => {
    let timer;
    if (state.isPlaying) {
      timer = setInterval(nextSlide, interval);
    }
    return () => clearInterval(timer);
  }, [state.isPlaying, nextSlide, interval]);

  // Preloading de la siguiente imagen
  useEffect(() => {
    if (slideCount > 1) {
      const nextIndex = (state.currentIndex + 1) % slideCount;
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = `https://picsum.photos/seed/${slides[nextIndex].id}/1400/500`;
      document.head.appendChild(preloadLink);

      return () => {
        document.head.removeChild(preloadLink);
      };
    }
  }, [state.currentIndex, slides, slideCount]);

  // Navegación por teclado
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  }, [nextSlide, prevSlide]);

  return {
    ...state,
    carouselRef,
    nextSlide,
    prevSlide,
    setSlide,
    handleKeyDown,
  };
};