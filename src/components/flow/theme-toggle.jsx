'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const iconClassName =
    theme !== 'light'
      ? 'w-3.5 h-3.5 text-neutral-400 group-hover:text-yellow-500 transition-colors duration-200'
      : 'w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 transition-colors duration-200';

  return (
    <button
      className="group w-7 h-7 border border-neutral-200 rounded-lg flex items-center justify-center hover:bg-neutral-100 transition-colors duration-200 dark:border-neutral-800 dark:hover:bg-neutral-900 active:scale-95"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <AnimatePresence mode="wait">
        <motion.div key={theme} initial={{ rotate: -180 }} animate={{ rotate: 0 }} exit={{ rotate: 180 }} transition={{ duration: 0.15 }}>
          {theme !== 'light' ? <SunIcon className={iconClassName} /> : <MoonIcon className={iconClassName} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
