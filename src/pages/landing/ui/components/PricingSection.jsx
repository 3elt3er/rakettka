import { useEffect, useMemo, useRef, useState } from 'react';
import { services } from '@/entities/service/model/services';
import { PriceCard } from '@/pages/landing/ui/components/PriceCard';

function getVisibleSlides() {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth >= 1280) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

export function PricingSection() {
  const viewportRef = useRef(null);
  const dragRef = useRef({
    isDragging: false,
    pointerId: null,
    startX: 0,
  });

  const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides);
  const [currentIndex, setCurrentIndex] = useState(services.length);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDraggingUI, setIsDraggingUI] = useState(false);
  const [autoplayPauseUntil, setAutoplayPauseUntil] = useState(0);

  const loopedServices = useMemo(() => [...services, ...services, ...services], []);

  const normalizeIndex = (index) => {
    if (index < services.length) {
      return index + services.length;
    }

    if (index >= services.length * 2) {
      return index - services.length;
    }

    return index;
  };

  const pauseAutoplay = () => {
    setAutoplayPauseUntil(Date.now() + 8000);
  };

  useEffect(() => {
    const handleResize = () => {
      setVisibleSlides((prev) => {
        const next = getVisibleSlides();
        return prev === next ? prev : next;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsTransitionEnabled(false);
    setCurrentIndex(services.length);
    setDragOffset(0);

    const frameId = window.requestAnimationFrame(() => {
      setIsTransitionEnabled(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [visibleSlides]);

  useEffect(() => {
    if (isDraggingUI) return undefined;

    const now = Date.now();
    const delay = autoplayPauseUntil > now ? autoplayPauseUntil - now : 4000;

    const timeoutId = window.setTimeout(() => {
      setIsTransitionEnabled(true);
      setCurrentIndex((prev) => prev + 1);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [autoplayPauseUntil, currentIndex, isDraggingUI]);

  useEffect(() => {
    if (isTransitionEnabled) return undefined;

    const frameId = window.requestAnimationFrame(() => {
      setIsTransitionEnabled(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [isTransitionEnabled]);

  const handlePointerDown = (event) => {
    if (!viewportRef.current) return;

    dragRef.current.isDragging = true;
    dragRef.current.pointerId = event.pointerId;
    dragRef.current.startX = event.clientX;

    pauseAutoplay();
    setIsDraggingUI(true);
    setIsTransitionEnabled(false);
    setCurrentIndex((prev) => normalizeIndex(prev));
    setDragOffset(0);

    viewportRef.current.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current.isDragging) return;

    setDragOffset(event.clientX - dragRef.current.startX);
  };

  const handlePointerEnd = (event) => {
    if (!dragRef.current.isDragging || !viewportRef.current) return;

    const threshold = Math.max(60, viewportRef.current.offsetWidth / (visibleSlides * 4));
    const offset = dragOffset;

    dragRef.current.isDragging = false;
    dragRef.current.pointerId = null;
    setIsDraggingUI(false);

    if (viewportRef.current.hasPointerCapture(event.pointerId)) {
      viewportRef.current.releasePointerCapture(event.pointerId);
    }

    setDragOffset(0);
    setIsTransitionEnabled(true);

    if (offset > threshold) {
      setCurrentIndex((prev) => prev - 1);
      return;
    }

    if (offset < -threshold) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    setCurrentIndex((prev) => prev);
  };

  const handleTransitionEnd = () => {
    const normalizedIndex = normalizeIndex(currentIndex);
    if (normalizedIndex !== currentIndex) {
      setIsTransitionEnabled(false);
      setCurrentIndex(normalizedIndex);
    }
  };

  return (
    <section className="space-y-5 overflow-hidden" id="pricing">
      <h2 className="text-3xl font-extrabold leading-none text-brand-ink sm:text-4xl">Стоимость услуг</h2>

      <div
        className={`${isDraggingUI ? 'cursor-grabbing select-none' : 'cursor-grab'} overflow-hidden pb-2 pt-6`}
        onPointerCancel={handlePointerEnd}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        ref={viewportRef}
        style={{ touchAction: 'pan-y' }}
      >
        <div
          className={`flex items-stretch ${isTransitionEnabled ? 'transition-transform duration-700 ease-out' : ''}`}
          onTransitionEnd={handleTransitionEnd}
          style={{ transform: `translateX(calc(-${(100 / visibleSlides) * currentIndex}% + ${dragOffset}px))` }}
        >
          {loopedServices.map((service, index) => (
            <div
              className="flex flex-none px-2"
              key={`${service.id}-${index}`}
              style={{ width: `${100 / visibleSlides}%` }}
            >
              <PriceCard className="w-full" service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
