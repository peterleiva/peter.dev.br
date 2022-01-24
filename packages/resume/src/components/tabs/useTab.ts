import { useState } from 'react';

export default function useTab(defaultTab: unknown) {
  const [tab, setTab] = useState(defaultTab);

  const isActivated = (value?: unknown) => value === tab;

  return { activate: setTab, isActivated, tab };
}
