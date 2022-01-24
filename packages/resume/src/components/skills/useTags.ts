import { useQuery } from 'react-query';
import type { Tag } from 'types';
import { getJsonOrThrow } from './helpers';

const fetchTags = async () => fetch('/api/tags').then(getJsonOrThrow);

export default function useTags() {
  const { data: tags, ...query } = useQuery<Tag[]>('tags', fetchTags);

  return { tags, ...query };
}
