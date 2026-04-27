import { useEffect, useState } from 'react';
import aboutImage1 from '@/shared/assets/XXXL.webp';
import aboutImage2 from '@/shared/assets/XXXL (1).webp';
import aboutImage3 from '@/shared/assets/XXXL (2).webp';

const aboutSlides = [
  { src: aboutImage1, alt: 'Зал клуба RakeTTka' },
  { src: aboutImage2, alt: 'Игровая зона клуба RakeTTka' },
  { src: aboutImage3, alt: 'Тренировка в клубе RakeTTka' },
];

export function AboutSection() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [loadedSlideIndexes, setLoadedSlideIndexes] = useState([0]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setActiveSlideIndex((currentIndex) => (currentIndex + 1) % aboutSlides.length);
    }, 4500);

    return () => window.clearTimeout(timeoutId);
  }, [activeSlideIndex]);

  useEffect(() => {
    setLoadedSlideIndexes((currentIndexes) =>
      currentIndexes.includes(activeSlideIndex) ? currentIndexes : [...currentIndexes, activeSlideIndex],
    );
  }, [activeSlideIndex]);

  const showPreviousSlide = () => {
    setActiveSlideIndex((currentIndex) => (currentIndex - 1 + aboutSlides.length) % aboutSlides.length);
  };

  const showNextSlide = () => {
    setActiveSlideIndex((currentIndex) => (currentIndex + 1) % aboutSlides.length);
  };

  return (
    <section id="about">
      <div className="space-y-3">
        <h2 className="text-3xl font-extrabold leading-none text-brand-ink sm:text-4xl">О клубе</h2>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div className="text-xl leading-relaxed text-brand-ink">
            <p>Клуб настольного тенниса RakeTTka — место, где рождается азарт и оттачивается мастерство.</p>

            <p>
              У нас ты найдёшь профессиональные столы и освещение, качественное напольное покрытие, индивидуальные и
              групповые тренировки, любительские турниры и, самое главное, дружелюбную атмосферу. Неважно, новичок ты
              или опытный игрок — у нас есть всё для комфортной игры.
            </p>
          </div>

          <div className="relative h-[21rem] w-full overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-[0_1rem_2rem_-1.4rem_rgba(15,23,42,0.45)] lg:max-w-[34rem] lg:justify-self-end">
            {aboutSlides.map((slide, index) => {
              const shouldRenderSlide = index === activeSlideIndex || loadedSlideIndexes.includes(index);

              if (!shouldRenderSlide) return null;

              return (
                <img
                  alt={slide.alt}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                    index === activeSlideIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                  decoding="async"
                  fetchpriority={index === 0 ? 'high' : 'low'}
                  key={slide.src}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  src={slide.src}
                />
              );
            })}

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-[#102a4a]/80 to-transparent px-4 pb-4 pt-16">
              <button
                aria-label="Предыдущая фотография"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-2xl font-black leading-none text-brand-ink shadow-[0_0.8rem_1.4rem_-1rem_rgba(15,23,42,0.7)] transition hover:-translate-y-0.5 hover:bg-white"
                onClick={showPreviousSlide}
                type="button"
              >
                ‹
              </button>

              <div className="flex items-center gap-2">
                {aboutSlides.map((slide, index) => (
                  <button
                    aria-label={`Показать фотографию ${index + 1}`}
                    aria-pressed={index === activeSlideIndex}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeSlideIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/55 hover:bg-white/80'
                    }`}
                    key={`dot-${slide.src}`}
                    onClick={() => setActiveSlideIndex(index)}
                    type="button"
                  />
                ))}
              </div>

              <button
                aria-label="Следующая фотография"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-2xl font-black leading-none text-brand-ink shadow-[0_0.8rem_1.4rem_-1rem_rgba(15,23,42,0.7)] transition hover:-translate-y-0.5 hover:bg-white"
                onClick={showNextSlide}
                type="button"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
