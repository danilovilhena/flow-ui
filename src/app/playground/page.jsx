'use client';

import Tabs from '@/components/flow/tabs';

export default function Playground() {
  const tabs = [{ label: 'Home' }, { label: 'About' }, { label: 'Contact' }];

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">🌀 Playground</h1>

      <div className="flex flex-col gap-8">
        <Tabs id="tabs-1" tabs={tabs} />
        <Tabs id="tabs-2" tabs={tabs} variant="underline" />
        <Tabs id="tabs-3" tabs={tabs} hoverable />
        <Tabs id="tabs-4" tabs={tabs} variant="underline" hoverable />
      </div>
    </main>
  );
}
