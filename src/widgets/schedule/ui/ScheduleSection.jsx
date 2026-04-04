import { useMemo, useState } from 'react';
import { trainers, weekDays } from '@/entities/trainer/model/trainers';
import { Button } from '@/shared/ui/Button';
import { SectionTitle } from '@/shared/ui/SectionTitle';

export function ScheduleSection() {
  const [activeDay, setActiveDay] = useState(weekDays[0]);

  const visibleTrainers = useMemo(() => trainers, []);

  return (
    <section id="schedule" className="space-y-6">
      <SectionTitle>Расписание тренировок</SectionTitle>

      <div className="flex flex-wrap gap-2">
        {weekDays.map((day) => (
          <button
            key={day}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              activeDay === day
                ? 'bg-slate-900 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
            onClick={() => setActiveDay(day)}
            type="button"
          >
            {day}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {visibleTrainers.map((trainer) => (
          <article
            key={`${activeDay}-${trainer.id}`}
            className="card-surface grid gap-3 bg-gradient-to-r from-slate-50 to-brand-50 p-3 sm:grid-cols-[1fr_auto]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-100 text-2xl">
                {trainer.avatar}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">{trainer.name}</h3>
                <p className="text-sm text-slate-500">{trainer.role}</p>
              </div>
            </div>
            <ul className="flex flex-col justify-center gap-1 text-base font-semibold text-slate-700">
              {trainer.slots.map((slot) => (
                <li key={slot}>◷ {slot}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="flex justify-center">
        <Button>Бронь стола</Button>
      </div>
    </section>
  );
}
