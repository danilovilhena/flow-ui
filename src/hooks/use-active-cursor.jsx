'use client';

import { useCallback, useEffect, useState } from 'react';

const useActiveCursor = ({ containerRef, defaultTab = 0, tabs }) => {
  const [activeIndex, setActiveIndex] = useState(defaultTab);
  const [cursorStyle, setCursorStyle] = useState({});

  const onItemClick = (index) => {
    setActiveIndex(index);
  };

  const getActiveItem = useCallback(() => {
    return containerRef?.current?.children?.[activeIndex];
  }, [containerRef, activeIndex]);

  const updateCursor = useCallback(() => {
    const activeItem = getActiveItem();
    if (!activeItem) {
      return;
    }

    const offsetLeft = activeItem.offsetLeft;
    const offsetWidth = activeItem.offsetWidth;

    setCursorStyle({
      transform: `translateX(${offsetLeft}px)`,
      width: `${offsetWidth}px`,
    });
  }, [getActiveItem]);

  useEffect(() => {
    const activeItem = getActiveItem();
    if (!activeItem) return;

    const resizeObserver = new ResizeObserver(updateCursor);
    resizeObserver.observe(activeItem);

    window.addEventListener('resize', updateCursor);
    updateCursor();

    return () => {
      resizeObserver.unobserve(activeItem);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateCursor);
    };
  }, [getActiveItem, updateCursor, tabs]);

  return { activeIndex, cursorStyle, onItemClick };
};

export default useActiveCursor;
