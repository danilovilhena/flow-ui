'use client';

import './Tabs.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ tabs = [], defaultActiveIndex = 0, onClick }) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [cursorStyle, setCursorStyle] = useState({});
  const containerRef = useRef(null);

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

  const onTabClick = (index) => {
    setActiveIndex(index);
    onClick?.(index);
  };

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

  return (
    <div className="relative flex items-center gap-2 w-full" ref={containerRef}>
      {tabs.map((tab, index) => (
        <button
          className={`px-2 py-1 transition-colors duration-200 ${activeIndex !== index ? 'text-gray-400 hover:text-gray-600' : ''}`}
          key={index}
          data-active={activeIndex === index}
          onClick={() => onTabClick(index)}
        >
          {tab.label}
        </button>
      ))}

      <motion.div
        className="absolute top-0 left-0 h-full bg-gray-100 rounded-md -z-10"
        initial={false}
        animate={cursorStyle}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
      />
    </div>
  );
};

export default Tabs;
