import { useEffect, useRef } from 'react';

type Params = {
  onIntersect: () => void;
  enabled?: boolean;
};

export function useInfiniteScroll({ onIntersect, enabled = true }: Params) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    });

    const current = ref.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [onIntersect, enabled]);

  return ref;
}
