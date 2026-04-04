import { illustrations } from '@/shared/assets/illustrations';
import { ImageStub } from '@/pages/landing/ui/components/ImageStub';

const rules = [
  {
    title: 'Приходите заранее',
    description: 'Просим приходить за 10-15 минут до начала тренировки или турнира, чтобы спокойно подготовиться и не задерживать игру.',
  },
  {
    title: 'Спортивная форма',
    description: 'Нужны сменная обувь без тёмной подошвы и удобная спортивная одежда для активной игры.',
  },
  {
    title: 'Бережное отношение к оборудованию',
    description: 'Ракетки, столы и мячи являются общим игровым инвентарём клуба. Используйте их аккуратно.',
  },
  {
    title: 'Отмена бронирования',
    description: 'Отменить тренировку или аренду можно не позднее чем за 6 часов. Поздняя отмена считается использованным занятием.',
  },
  {
    title: 'Турниры',
    description: 'Регистрация закрывается за 30 минут до начала. Просим соблюдать спортивную этику и уважать соперников.',
  },
  {
    title: 'Безопасность',
    description: 'Во время игры сохраняйте дистанцию, следите за мячами на соседних столах и выполняйте указания тренера.',
  },
];

export function RulesSection() {
  const rulesIllustration = illustrations.clubRules;

  return (
    <section className="space-y-5" id="rules">
      <div className="flex items-start gap-3">
        <div>
          <h2 className="text-3xl font-extrabold leading-none text-brand-ink sm:text-4xl">Правила клуба</h2>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Короткий свод правил, чтобы тренировки, аренда столов и турниры проходили спокойно и без накладок.
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <article>
          <ol className="space-y-4">
            {rules.map((rule, index) => (
              <li
                className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:px-5"
                key={rule.title}
              >
                <div className="flex gap-4">
                  <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#1f5ba8] text-lg font-black text-white shadow-[0_0.8rem_1.4rem_-0.8rem_rgba(31,91,168,0.7)]">
                    {index + 1}
                  </span>

                  <div className="space-y-1">
                    <h3 className="text-lg font-extrabold leading-tight text-brand-ink sm:text-xl">{rule.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{rule.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <div className="space-y-4">
          <ImageStub
            alt={rulesIllustration.alt}
            className="h-[24rem] rounded-[1.75rem]"
            label={rulesIllustration.label}
            labelClassName="text-xl sm:text-2xl"
            src={rulesIllustration.src}
          />

          <div className="px-5 py-5 text-brand-ink rounded-2xl border border-white/70 bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:px-5">
            <h3 className="text-xl font-extrabold leading-tight">Немного от нас</h3>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Мы за дружелюбную атмосферу, честную игру и понятные правила. Если что-то неясно, администратор и тренер
              подскажут на месте.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
