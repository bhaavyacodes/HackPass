import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ringRef = useRef({ x: -100, y: -100 });
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if target or parent is clickable
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);

    // Smooth lerp animation for the trailing ring
    let animationFrameId: number;
    const animate = () => {
      ringRef.current.x += (mouseRef.current.x - ringRef.current.x) * 0.18;
      ringRef.current.y += (mouseRef.current.y - ringRef.current.y) * 0.18;
      setRingPos({ x: ringRef.current.x, y: ringRef.current.y });
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Central pointer dot */}
      <div
        className="custom-cursor-dot"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.4 : 1})`,
          backgroundColor: isHovered ? '#EC4899' : '#9333EA',
        }}
      />
      {/* Smooth outer follower ring */}
      <div
        className="custom-cursor-ring"
        style={{
          left: `${ringPos.x}px`,
          top: `${ringPos.y}px`,
          width: isHovered ? '46px' : '30px',
          height: isHovered ? '46px' : '30px',
          borderColor: isHovered ? 'rgba(236, 72, 153, 0.7)' : 'rgba(147, 51, 234, 0.45)',
          backgroundColor: isHovered ? 'rgba(236, 72, 153, 0.1)' : 'rgba(147, 51, 234, 0.05)',
        }}
      />
    </>
  );
};