/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import dynamic from 'next/dynamic';
import { IconBaseProps } from 'react-icons';
import { BsLink45Deg as FallbackIcon } from 'react-icons/bs';

export type LibIcon =
  | 'ai'
  | 'bi'
  | 'bs'
  | 'cg'
  | 'di'
  | 'fa'
  | 'fc'
  | 'fi'
  | 'gi'
  | 'go'
  | 'gr'
  | 'hi'
  | 'im'
  | 'io'
  | 'io5'
  | 'md'
  | 'ri'
  | 'si'
  | 'ti'
  | 'vsc'
  | 'wi';

type Options = {
  lib: LibIcon;
  name: string;
};

const fallback = () => FallbackIcon;

export function iconLoader({ lib, name = '' }: Partial<Options> = {}) {
  if (!lib) return fallback();

  // TODO: melhorar a tipagem e remover os ignores do eslint ☝️
  return dynamic<IconBaseProps>(
    () =>
      import(`react-icons/${lib}/index.js`)
        .then(mod => mod[name] ?? fallback())
        .catch(() => fallback),
    {
      ssr: false,
    }
  );
}
