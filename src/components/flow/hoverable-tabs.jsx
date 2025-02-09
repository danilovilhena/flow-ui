'use client';

import { motion, MotionConfig, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

const HoverableTabs = ({ tabs, defaultActiveIndex = 0, onClick }) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [cursorStyle, setCursorStyle] = useState({});
  const [hoverIndex, setHoverIndex] = useState(null);
  const containerRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const getActiveItem = useCallback(() => {
    return containerRef?.current?.children?.[activeIndex];
  }, [containerRef, activeIndex]);

  const onTabClick = (index) => {
    setActiveIndex(index);
    onClick?.(index);
  };

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
  }, [getActiveItem, updateCursor]);

  const handleHover = (index) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoverIndex(index);

    hoverTimeoutRef.current = setTimeout(() => {
      setHoverIndex(null);
    }, 1000);
  };

  return (
    <div className="relative flex items-center gap-2 w-fit" ref={containerRef}>
      <MotionConfig transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}>
        {tabs.map((tab, index) => (
          <button
            className={`relative px-2 py-1 transition-colors duration-200 ${activeIndex !== index ? 'text-gray-400 hover:text-gray-600' : ''}`}
            key={index}
            data-active={activeIndex === index}
            onClick={() => onTabClick(index)}
            onFocus={() => handleHover(index)}
            onMouseOver={() => handleHover(index)}
            onMouseLeave={() => handleHover(index)}
          >
            <AnimatePresence>
              {hoverIndex === index && (
                <motion.div
                  layoutId="flow-hover-indicator"
                  className="absolute inset-0 bg-black/5 rounded-md -z-10 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
            {tab.label}
          </button>
        ))}
        <motion.div
          className="absolute -bottom-1 left-0 h-[1px] bg-gray-900 rounded-md -z-10 pointer-events-none"
          initial={false}
          animate={cursorStyle}
        />
      </MotionConfig>
    </div>
  );
};

export default HoverableTabs;
