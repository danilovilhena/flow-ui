'use client';

import HoverableTabs from '@/components/flow/hoverable-tabs.jsx';
import Tabs from '@/components/flow/tabs.jsx';

export default function Playground() {
  const tabs = [{ label: 'Home' }, { label: 'About' }, { label: 'Contact' }];

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">🌀 Playground</h1>

      <div className="flex flex-col gap-8">
        <Tabs tabs={tabs} />
        <HoverableTabs tabs={tabs} />
      </div>
    </main>
  );
}
