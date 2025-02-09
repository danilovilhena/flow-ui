'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils.js';
import useActiveCursor from '@/hooks/use-active-cursor.jsx';

const tabsCursorVariants = cva('absolute left-0 -z-10 pointer-events-none', {
  variants: {
    variant: {
      default: 'top-0 h-full bg-gray-100 dark:bg-neutral-900 rounded-md',
      underline: '-bottom-1 h-[1px] bg-gray-900 dark:bg-neutral-100 rounded-md',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const tabsHoverVariants = cva('absolute -z-9 pointer-events-none', {
  variants: {
    variant: {
      default: 'inset-0 bg-black/5 dark:bg-neutral-100/5 rounded-md',
      underline: 'inset-x-0 -bottom-1 h-[1px] bg-gray-900 dark:bg-neutral-100 rounded-md',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const Tabs = ({ id, tabs = [], defaultTab = 0, variant = 'default', hoverable = false, onClick }) => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const hoverTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const { activeIndex, cursorStyle, onItemClick } = useActiveCursor({
    containerRef,
    defaultTab,
    tabs,
  });

  const handleTabClick = (index) => {
    onItemClick(index);
    onClick?.(index);
  };

  const handleHover = (index) => {
    clearTimeout(hoverTimeoutRef.current);
    setHoverIndex(index);

    hoverTimeoutRef.current = setTimeout(() => {
      if (!containerRef.current?.matches(':hover')) {
        setHoverIndex(null);
      }
    }, 500);
  };

  const renderHoverEffect = (index) => {
    if (!hoverable || hoverIndex !== index) return null;

    return (
      <motion.div
        layoutId={`tabs-hover-${id}`}
        className={tabsHoverVariants({
          variant: variant === 'default' ? 'underline' : 'default',
        })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    );
  };

  return (
    <div className="relative flex items-center gap-2 w-full" ref={containerRef} id={id}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={cn(
            'px-2 py-1 transition-colors duration-200',
            activeIndex !== index ? 'text-gray-400 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-neutral-400' : '',
            hoverable ? 'relative' : '',
          )}
          data-active={activeIndex === index}
          data-hoverable={hoverable}
          data-is-hovering={hoverIndex === index}
          onClick={() => handleTabClick(index)}
          onFocus={hoverable ? () => handleHover(index) : undefined}
          onMouseOver={hoverable ? () => handleHover(index) : undefined}
          onMouseLeave={hoverable ? () => handleHover(index) : undefined}
        >
          {hoverable && <AnimatePresence>{renderHoverEffect(index)}</AnimatePresence>}
          {tab.label}
        </button>
      ))}

      <motion.div
        className={tabsCursorVariants({ variant })}
        initial={false}
        animate={cursorStyle}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
      />
    </div>
  );
};

export default Tabs;
