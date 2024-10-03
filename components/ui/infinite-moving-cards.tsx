import React, { useEffect, useRef, useState } from 'react';

interface InfiniteMovingCardsProps {
  items: React.ReactNode[];
  speed?: 'slow' | 'normal' | 'fast' | 'faster';
  direction?: 'left' | 'right';
}

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  items,
  speed = 'normal',
  direction = 'left',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollSpeed = typeof speed === 'number' 
    ? speed 
    : speed === 'slow' ? 100 : speed === 'normal' ? 50 : speed === 'fast' ? 25 : 15;
    setDuration(container.offsetWidth / scrollSpeed);
  }, [speed, items]);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black to-transparent z-10 sm:w-1/4" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black to-transparent z-10 sm:w-1/4" />
      <div
        ref={containerRef}
        className="flex"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          '--duration': `${duration}s`,
          '--direction': direction === 'left' ? 'normal' : 'reverse',
          animation: `scroll var(--duration) linear ${isHovered ? 'paused' : 'infinite'}`,
          animationDirection: 'var(--direction)',
        } as React.CSSProperties}
      >
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="flex-shrink-0 w-[200px] p-2 mx-2">
            <div className="text-black font-bold p-4 ">
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
