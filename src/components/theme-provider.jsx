'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const ThemeProvider = ({ children, ...props }) => {
  return (
    <NextThemesProvider {...props} enableSystem suppressHydrationWarning>
      <div suppressHydrationWarning>{children}</div>
    </NextThemesProvider>
  );
};

export default ThemeProvider;
