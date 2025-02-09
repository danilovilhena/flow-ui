'use client';

import { useEffect } from 'react';

/**
 * A React hook for handling keyboard shortcuts across different platforms (macOS and Windows/Linux).
 * Automatically handles the Command/Control key differences between platforms and provides a consistent API.
 *
 * @param {Object} shortcuts - An object mapping shortcut keys to their handler functions
 * @param {Function} shortcuts[key] - Callback function to execute when the shortcut is triggered
 *
 * @example
 * // Define shortcuts from Mac perspective (cmd key will automatically map to ctrl on Windows)
 * const shortcuts = {
 *   // Triggers on Cmd+K (Mac) or Ctrl+K (Windows)
 *   'cmd+k': () => console.log('Command menu triggered'),
 *
 *   // Triggers specifically on Ctrl+K (both Mac and Windows)
 *   'ctrl+k': () => console.log('Control specific action'),
 *
 *   // Triggers on Cmd+Shift+K (Mac) or Ctrl+Shift+K (Windows)
 *   'cmd+shift+k': () => console.log('Another action'),
 *
 *   // Simple key without modifiers
 *   'escape': () => console.log('Escape pressed')
 * };
 *
 * // Use the hook in your component
 * function MyComponent() {
 *   useKeyHandler(shortcuts);
 *   return <div>Press some keys!</div>;
 * }
 *
 * @remarks
 * - Shortcut keys should be defined using Mac conventions (cmd key)
 * - The hook automatically maps cmd to ctrl on Windows/Linux
 * - Supports multiple modifier keys (cmd, ctrl, alt, shift)
 * - Prevents default browser behavior when shortcuts are triggered
 * - Keys are case-insensitive
 */
const useKeyHandler = (shortcuts) => {
  const isMac = typeof window !== 'undefined' && navigator.platform.toLowerCase().includes('mac');

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      const modifiers = [
        event.ctrlKey && 'ctrl',
        (isMac ? event.metaKey : event.ctrlKey) && 'cmd',
        event.altKey && 'alt',
        event.shiftKey && 'shift',
      ].filter(Boolean);

      const shortcutKey = modifiers.length > 0 ? `${modifiers.join('+')}+${key}` : key;

      if (shortcuts[shortcutKey]) {
        event.preventDefault();
        shortcuts[shortcutKey](event);
        return;
      }

      if (!isMac && event.ctrlKey) {
        const macShortcut = shortcutKey.replace('ctrl+', 'cmd+');
        if (shortcuts[macShortcut]) {
          event.preventDefault();
          shortcuts[macShortcut](event);
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts, isMac]);
};

export default useKeyHandler;
