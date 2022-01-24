import { useState } from 'react';

export default function useTab<T>() {
  const [tab, setTab] = useState<T>();

  const isActivated = (value?: T) => value === tab;

  return { activate: setTab, isActivated, tab };
}
