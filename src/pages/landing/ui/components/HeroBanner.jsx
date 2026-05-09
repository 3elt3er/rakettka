import { illustrations } from '@/shared/assets/illustrations';

export function HeroBanner() {
  const heroIllustration = illustrations.hero;

  return (
    <section className="relative overflow-hidden border-b border-slate-300 bg-[#d8e7f9]">
      <img
        alt={heroIllustration.alt}
        className="block h-auto w-full"
        decoding="async"
        fetchpriority="high"
        loading="eager"
        src={heroIllustration.src}
      />

      <div className="absolute inset-0" />
    </section>
  );
}
