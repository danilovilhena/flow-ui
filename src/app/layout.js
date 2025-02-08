import './globals.css';

export const metadata = {
  title: 'Flow UI',
  description: 'A modern collection of beautifully crafted React components built with Framer Motion and Tailwind CSS.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
