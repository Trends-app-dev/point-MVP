import React, { useCallback, useLayoutEffect, useRef } from "react";

/**
 * Custom hook para bloquear y desbloquear el desplazamiento de la página.
 *
 * @returns {Object} Objeto con funciones `lockScroll` y `unlockScroll`.
 */
export const useScrollLock = () => {
  // Almacenamos el valor original de overflow
  const originalOverflow = useRef("");

  // Almacenamos el valor original de paddingRight
  const originalPaddingRight = useRef("");

  /**
   * Bloquea el desplazamiento de la página.
   */
  const lockScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "var(--scrollbar-compensation)";
    document.body.dataset.scrollLock = "true";
  }, []);

  /**
   * Desbloquea el desplazamiento de la página.
   */
  const unlockScroll = useCallback(() => {
    document.body.style.overflow = originalOverflow.current;
    document.body.style.paddingRight = originalPaddingRight.current;

    delete document.body.dataset.scrollLock;
  }, []);

  // Ajusta la compensación de la barra de desplazamiento
  useLayoutEffect(() => {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
    document.body.style.setProperty(
      "--scrollbar-compensation",
      `${scrollBarCompensation}px`
    );
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
};
