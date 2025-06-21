import { useMemo } from 'react';
import { getFlagImageUrl } from '../lib/utilities';

const useGetFlags = (client) => {
  if (!client) return '';
  return useMemo(() => getFlagImageUrl(client.country), [client]);
};

export default useGetFlags;