'use client';

import Tabs from '@/components/flow/tabs';
import ThemeToggle from '@/components/flow/theme-toggle.jsx';

export default function Playground() {
  const tabs = [{ label: 'Home' }, { label: 'About' }, { label: 'Contact' }];

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">🌀 Playground</h1>
        <ThemeToggle />
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <p className="text-sm text-gray-500 mb-2">Default Tabs</p>
          <Tabs id="tabs-1" tabs={tabs} />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-2">Underline Variant</p>
          <Tabs id="tabs-2" tabs={tabs} variant="underline" />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-2">Hoverable Tabs</p>
          <Tabs id="tabs-3" tabs={tabs} hoverable />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-2">Hoverable Underline Tabs</p>
          <Tabs id="tabs-4" tabs={tabs} variant="underline" hoverable />
        </div>
      </div>
    </main>
  );
}
