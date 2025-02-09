import './globals.css';
import { GeistSans } from 'geist/font/sans';
import ThemeProvider from '@/components/theme-provider';

export const metadata = {
  title: 'Flow UI',
  description: 'A modern collection of beautifully crafted React components built with Framer Motion and Tailwind CSS.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🌀</text></svg>"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
