import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';
import type { Tag } from 'types';
import { getJsonOrThrow } from './helpers';

const fetchTags =
  (locale = '') =>
  async () =>
    fetch('/api/tags', {
      headers: {
        locale: locale,
      },
    }).then(getJsonOrThrow);

export default function useTags() {
  const { i18n } = useTranslation();
  const { data: tags, ...query } = useQuery<Tag[]>(
    'tags',
    fetchTags(i18n.language)
  );

  return { tags, ...query };
}
