'use client';

import ThemeToggle from '@/components/flow/theme-toggle.jsx';
import Link from 'next/link';

const DocsHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full h-fit bg-background/40 backdrop-blur-lg">
      <div className="flex p-4 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/">
            <p className="text-xl font-bold text-center">🌀 Flow UI</p>
          </Link>
          <Link
            href="/docs"
            className="text-sm text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors duration-200"
          >
            Components
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative flex items-center justify-between w-64 h-8 px-2 border rounded-lg cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-200">
            <p className="text-[12px] text-neutral-500 dark:text-neutral-400">Search components (soon)</p>
            <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-neutral-50 dark:bg-neutral-900 px-1.5 font-mono text-[10px] text-neutral-400 font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
          <ThemeToggle />
        </div>
      </div>
      <hr className="m-0 h-px w-full border-none bg-neutral-400/10" />
    </header>
  );
};

export default DocsHeader;
