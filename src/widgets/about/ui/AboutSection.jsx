import { SectionTitle } from '@/shared/ui/SectionTitle';

export function AboutSection() {
  return (
    <section id="about" className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
          О клубе
        </span>
        <span className="rounded-xl bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
          Расписание
        </span>
        <span className="rounded-xl bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
          Цены
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <SectionTitle>О клубе</SectionTitle>
          <p className="text-base leading-relaxed text-slate-600">
            Индивидуальные тренировки и спарринг-сессии для любого уровня подготовки. Клуб сочетает
            уютную атмосферу, современный зал и поддержку тренеров, которые помогают расти с каждого
            занятия.
          </p>
        </div>
        <div className="card-surface overflow-hidden">
          <div className="flex h-full min-h-56 items-end justify-between bg-gradient-to-br from-slate-200 via-brand-50 to-brand-200 p-5">
            <span className="text-4xl">🏓</span>
            <span className="text-4xl">🧺</span>
          </div>
        </div>
      </div>
    </section>
  );
}
