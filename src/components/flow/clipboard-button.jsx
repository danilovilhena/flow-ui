'use client';

import { cn } from '@/lib/utils.js';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, ClipboardIcon } from 'lucide-react';
import { useState } from 'react';

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

const slideVariants = {
  initial: { overflow: 'hidden', opacity: 0, y: -25 },
  visible: { overflow: 'hidden', opacity: 1, y: 0 },
  exit: { overflow: 'hidden', opacity: 0, y: 25 },
};

const ClipboardButton = ({ onCopy, variant = 'scale' }) => {
  const [copied, setCopied] = useState(false);
  const iconClassName = 'w-3.5 h-3.5 text-neutral-700 group-hover:text-neutral-900 transition-colors duration-200';

  const handleCopy = () => {
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 1500);
  };

  const renderIcon = () => {
    return copied ? (
      <CheckIcon className={cn(iconClassName, 'text-green-500 group-hover:text-green-600')} />
    ) : (
      <ClipboardIcon className={iconClassName} />
    );
  };

  return (
    <button
      className="relative overflow-hidden group w-7 h-7 border border-neutral-200 rounded-lg flex items-center justify-center hover:bg-neutral-100 transition-colors duration-200 dark:border-neutral-800 dark:hover:bg-neutral-900 active:scale-95"
      title="Copy to clipboard"
      onClick={handleCopy}
    >
      {variant === 'scale' ? (
        <AnimatePresence mode="wait">
          <motion.div key={copied} variants={scaleVariants} initial="hidden" animate="visible" exit="hidden" transition={{ duration: 0.15 }}>
            {renderIcon()}
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={copied}
            className="absolute inset-0 flex items-center justify-center"
            variants={slideVariants}
            initial="initial"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
          >
            {renderIcon()}
          </motion.div>
        </AnimatePresence>
      )}
    </button>
  );
};

export default ClipboardButton;
