import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

export function useLocalStorage<T>(key: string, atomState: any): boolean {
  const [state, setState] = useRecoilState<T>(atomState);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error('저장 실패', e);
      }
    }
    setIsReady(true);
  }, [key, setState]);

  useEffect(() => {
    if (isReady) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state, isReady]);

  return isReady;
}