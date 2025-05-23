import { useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useMemo, useState, useCallback } from "react";

export function useScrollOffSetTop(top = 0) {
  const elementRef = useRef(null);

  const { scrollY } = useScroll();

  const [offsetTop, setOffsetTop] = useState(false);

  const handleScrollChange = useCallback(
    (val) => {
      const scrollHeight = Math.round(val);

      if (elementRef?.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const elementTop = Math.round(rect.top);

        setOffsetTop(elementTop < top);
      } else {
        setOffsetTop(scrollHeight > top);
      }
    },
    [elementRef, top]
  );

  useMotionValueEvent(
    scrollY,
    "change",
    useMemo(() => handleScrollChange, [handleScrollChange])
  );

  const memoizedValue = useMemo(() => ({ elementRef, offsetTop }), [offsetTop]);

  return memoizedValue;
}
