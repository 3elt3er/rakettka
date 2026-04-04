import { useState } from 'react';
import { scheduleDays, trainers } from '@/entities/trainer/model/trainers';
import { schedulePromoIllustration } from '@/shared/assets/illustrations';
import { ImageStub } from '@/pages/landing/ui/components/ImageStub';
import { TrainerRow } from '@/pages/landing/ui/components/TrainerRow';

export function ScheduleSection() {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  return (
    <section className="space-y-5 pt-6" id="schedule">
      <h2 className="text-3xl font-extrabold leading-none text-brand-ink sm:text-4xl">Расписание тренировок</h2>

      <div className="grid gap-5 rounded-2xl border border-slate-300 bg-white p-4 lg:grid-cols-[1fr_20rem] lg:items-center">
        <div className="space-y-3">
          <p className="text-lg leading-relaxed text-brand-ink">
            Помимо взрослых групп и индивидуальных слотов, в клубе есть детские тренировки с понятной нагрузкой и
            постепенным входом в игру.
          </p>
          <div className="flex flex-wrap gap-2 text-sm font-semibold text-brand-ink">
            <span className="rounded-full bg-brand-50 px-3 py-1.5">Детские группы</span>
            <span className="rounded-full bg-brand-50 px-3 py-1.5">Индивидуальные слоты</span>
            <span className="rounded-full bg-brand-50 px-3 py-1.5">Подготовка к турнирам</span>
          </div>
        </div>

        <ImageStub
          alt={schedulePromoIllustration.alt}
          className="h-64 rounded-xl border border-slate-300"
          label={schedulePromoIllustration.label}
          labelClassName="text-lg sm:text-xl"
          src={schedulePromoIllustration.src}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {scheduleDays.map((day, index) => (
          <button
            className={`min-w-10 rounded-lg px-3 py-1.5 text-sm font-semibold ${
              index === activeDayIndex ? 'bg-slate-800 text-white' : 'bg-slate-200 text-brand-ink'
            }`}
            key={`${day}-${index}`}
            onClick={() => setActiveDayIndex(index)}
            type="button"
          >
            {day}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {trainers.map((trainer) => (
          <TrainerRow key={trainer.id} trainer={trainer} />
        ))}
      </div>
    </section>
  );
}
