import { useEffect, useState } from 'react';
import { urlBuilder, UrlBuilderProps } from '../urlBuilder';

export const useUrlBuilder = (props: UrlBuilderProps) => {
  const [urlResult, setUrlResult] = useState('');

  useEffect(() => {
    setUrlResult(urlBuilder(props) || '');
  }, [props]);

  return { urlResult };
};
