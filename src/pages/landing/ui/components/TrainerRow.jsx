export function TrainerRow({ trainer }) {
  const initials = trainer.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

  return (
    <article className="overflow-hidden rounded-xl border border-slate-300 bg-gradient-to-r from-[#f8fbff] via-[#edf4fc] to-[#f8fbff] shadow-sm">
      <div className="grid items-stretch gap-0 sm:grid-cols-[1fr_auto]">
        <div className="flex items-center gap-4 border-b border-slate-300 px-4 py-3 sm:border-b-0">
          <span className="inline-flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-brand-100 text-xl font-black text-brand-900">
            {initials}
          </span>

          <div className="space-y-1">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Тренер</p>
            <h3 className="text-2xl font-bold leading-none text-brand-ink">{trainer.name}</h3>
          </div>
        </div>

        <ul className="space-y-1 px-4 py-3 text-xl font-semibold text-brand-ink sm:min-w-56">
          {trainer.slots.map((slot) => (
            <li className="flex items-center gap-2" key={slot}>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-400 text-[0.7rem] leading-none">
                •
              </span>
              {slot}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
