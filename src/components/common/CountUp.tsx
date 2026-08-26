import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

interface CountUpProps {
  value: string | number;
  durationMs?: number;
}

export const CountUp: React.FC<CountUpProps> = ({
  value,
  durationMs = 1200,
}) => {
  const reducedMotion = useReducedMotion();

  const parseValue = (val: string | number) => {
    if (typeof val === 'number') {
      return { hasNumber: true, number: val, suffix: '' };
    }
    const match = val.match(/^(\d+(?:\s\d{3})*)(.*)$/);
    if (!match) {
      return { hasNumber: false, number: 0, suffix: val };
    }
    const cleanNum = match[1].replace(/\s/g, '');
    if (cleanNum.length === 0) {
      return { hasNumber: false, number: 0, suffix: val };
    }
    return {
      hasNumber: true,
      number: parseInt(cleanNum, 10),
      suffix: match[2],
    };
  };

  const parsed = parseValue(value);
  const [current, setCurrent] = useState<number>(
    parsed.hasNumber && !reducedMotion ? 0 : parsed.number
  );

  useEffect(() => {
    if (!parsed.hasNumber || reducedMotion) {
      setCurrent(parsed.number);
      return;
    }

    let animationFrame: number;
    const startTime = performance.now();
    const target = parsed.number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, durationMs, reducedMotion, parsed.hasNumber, parsed.number]);

  if (!parsed.hasNumber) {
    return <span>{value}</span>;
  }

  return (
    <span>
      {current.toLocaleString('fr-FR').replace(/ | /g, ' ')}
      {parsed.suffix}
    </span>
  );
};
