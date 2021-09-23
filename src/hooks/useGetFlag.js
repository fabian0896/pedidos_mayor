import { useMemo } from 'react';
import { getFlagImageUrl } from '../lib/utilities';

const useGetFlags = (client) => {
  return useMemo(() => getFlagImageUrl(client.country), [client]);
};

export default useGetFlags;