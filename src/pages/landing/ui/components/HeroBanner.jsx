import { illustrations } from '@/shared/assets/illustrations';

export function HeroBanner() {
  const heroIllustration = illustrations.hero;

  return (
    <section className="relative overflow-hidden border-b border-slate-300">
      <img
        alt={heroIllustration.alt}
        className="h-[26rem] w-full object-cover object-center sm:h-[32rem]"
        src={heroIllustration.src}
      />

      <div className="absolute inset-0" />
    </section>
  );
}
