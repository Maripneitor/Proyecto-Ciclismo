// src/hooks/useSticky.js
import { useState, useEffect, useRef } from 'react';

/**
 * Hook para detectar cuándo un elemento debe volverse "sticky".
 * @param {number} offset - Distancia desde el top para activar el modo sticky.
 * @returns {[React.RefObject, boolean]} Una ref para el elemento y el estado sticky.
 */
export const useSticky = (offset = 200) => {
    const [isSticky, setSticky] = useState(false);
    const elementRef = useRef(null);

    const handleScroll = () => {
        if (window.scrollY > offset) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [offset]);

    return [elementRef, isSticky];
};