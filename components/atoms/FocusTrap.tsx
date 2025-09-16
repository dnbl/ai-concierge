import React, { useEffect, useRef, useCallback } from 'react';

interface FocusTrapProps {
  children: React.ReactNode;
  active?: boolean;
  initialFocus?: React.RefObject<HTMLElement>;
  returnFocus?: boolean;
  className?: string;
}

const FocusTrap: React.FC<FocusTrapProps> = ({
  children,
  active = true,
  initialFocus,
  returnFocus = true,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
    ).filter(element => {
      return (
        element.offsetWidth > 0 &&
        element.offsetHeight > 0 &&
        !element.hasAttribute('hidden')
      );
    });
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!active || event.key !== 'Tab') return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const currentElement = document.activeElement as HTMLElement;

    if (event.shiftKey) {
      // Shift + Tab (backward)
      if (currentElement === firstElement || !focusableElements.includes(currentElement)) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab (forward)
      if (currentElement === lastElement || !focusableElements.includes(currentElement)) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }, [active, getFocusableElements]);

  useEffect(() => {
    if (!active) return;

    // Store the previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Set initial focus
    if (initialFocus?.current) {
      initialFocus.current.focus();
    } else {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      
      // Return focus to previous element
      if (returnFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [active, initialFocus, returnFocus, handleKeyDown, getFocusableElements]);

  return (
    <div 
      ref={containerRef}
      className={className}
      tabIndex={-1}
    >
      {children}
    </div>
  );
};

export default FocusTrap;