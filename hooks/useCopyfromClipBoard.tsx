import { useState, useCallback, useEffect } from 'react';

type CopyStatus = 'uninitialized' | 'success' | 'failure';

const isSSR = typeof window === undefined;

export const useCopyToClipboard = (delay: number = 3000) => {
  const [status, setStatus] = useState<CopyStatus>('uninitialized');
  const copyText = useCallback((text: string) => {
    navigator.clipboard?.writeText(text).then(
      () => setStatus('success'),
      () => setStatus('failure')
    );
  }, []);
  useEffect(() => {
    const intervalId = setTimeout(() => {
      if (status === 'uninitialized') {
        return;
      }
      setStatus('uninitialized');
    }, delay);
    return () => clearInterval(intervalId);
  }, [status, delay]);

  return { status, copyText };
};
