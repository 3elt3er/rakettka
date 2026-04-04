import { Container } from '@/shared/ui/Container';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-100 to-white">
      <Container>
        <div className="grid gap-6 py-8 md:grid-cols-2 md:items-end md:py-10">
          <div className="space-y-4">
            <p className="inline-flex rounded-full bg-brand-50 px-4 py-1 text-sm font-semibold text-brand-900">
              Клуб настольного тенниса в Москве
            </p>
            <h1 className="text-4xl font-black leading-tight text-slate-900 md:text-5xl">
              Тренируйся с удовольствием и прогрессируй быстрее
            </h1>
            <p className="text-base text-slate-600">
              Индивидуальные и групповые занятия, аренда столов, сильный тренерский состав и
              комфортный зал.
            </p>
          </div>
          <div className="card-surface bg-gradient-to-br from-brand-200 to-brand-50 p-6">
            <div className="mb-3 flex items-center justify-between text-5xl">
              <span>🦝🏓</span>
              <span>🦝🏓</span>
            </div>
            <div className="rounded-xl bg-slate-800/90 p-4">
              <div className="h-2 rounded-full bg-white/50" />
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div className="h-16 rounded-lg bg-brand-100/80" />
                <div className="h-16 rounded-lg bg-brand-200/80" />
                <div className="h-16 rounded-lg bg-brand-100/80" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
