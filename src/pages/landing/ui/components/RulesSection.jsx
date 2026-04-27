import { useState } from 'react';
import { illustrations } from '@/shared/assets/illustrations';
import { ImageStub } from '@/pages/landing/ui/components/ImageStub';

const rules = [
  {
    title: 'Общие положения',
    items: [
      'Настоящие Правила являются официальным документом Клуба настольного тенниса RakeTTka.',
      'Посещая Клуб, бронируя услуги или производя оплату (наличным или безналичным расчетом в рублях РФ), Клиент подтверждает, что внимательно ознакомился с Правилами, понимает их содержание и принимает их в полном объеме.',
      'Администрация Клуба исходит из того, что все положения Правил ясны Клиенту до начала пользования услугами.',
    ],
  },
  {
    title: 'Требования к внешнему виду и гигиене',
    items: [
      {
        strong: 'Обувь:',
        text: ' нахождение в игровой зоне допускается только в сменной спортивной обуви. Настоятельно рекомендуется обувь со светлой (не маркирующей) подошвой.',
      },
      {
        strong: 'Вход в клуб:',
        text: ' при входе в помещение Клиент обязан надеть чистые бахилы или переобуться в сменную обувь.',
      },
      {
        strong: 'Чистота:',
        text: ' Клиент обязан соблюдать правила личной и общественной гигиены, а также поддерживать чистоту на территории Клуба.',
      },
    ],
  },
  {
    title: 'Бронирование и отмена услуг',
    items: [
      {
        strong: 'Бесплатная отмена:',
        text: ' отмена забронированной услуги без штрафных санкций возможна не позднее чем за 8 часов до начала сеанса.',
      },
      {
        strong: 'Поздняя отмена:',
        text: ' при отмене брони менее чем за 8 часов до начала, Клуб оставляет за собой право потребовать полную оплату забронированной услуги.',
      },
      {
        strong: 'Пропуск занятий:',
        text: ' занятия, пропущенные по вине Клиента (в том числе при опоздании или неявке), не переносятся на другое время, а их стоимость не возмещается.',
      },
    ],
  },
  {
    title: 'Поведение и безопасность',
    items: [
      'Клиент обязуется уважительно и бережно относиться к сотрудникам Клуба, другим посетителям, третьим лицам, а также к имуществу Клуба и окружающих лиц.',
      {
        strong: 'Личные вещи:',
        text: ' во время нахождения в Клубе не рекомендуется оставлять личные вещи без присмотра. Клуб не несет ответственности за утрату или порчу вещей, оставленных Клиентом без надзора.',
      },
      {
        strong: 'Нарушение правил:',
        text: ' систематическое или грубое нарушение любых пунктов настоящих Правил влечет за собой внесение Клиента в черный список и полный запрет на посещение Клуба.',
      },
    ],
  },
  {
    title: 'Материальная ответственность',
    items: [
      'Клиент несет полную материальную ответственность за ущерб, причиненный имуществу Клуба.',
      'В случае порчи или утраты имущества Клуба по вине Клиента, он обязан возместить стоимость ущерба в полном объеме на основании выставленного счета.',
    ],
  },
];

export function RulesSection() {
  const rulesIllustration = illustrations.clubRules;
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  return (
    <section id="rules">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div>
          <h2 className="text-3xl font-extrabold leading-none text-brand-ink sm:text-4xl">
            Правила посещения клуба настольного тенниса RakeTTka
          </h2>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Посещая клуб, бронируя услуги или производя оплату, Клиент подтверждает согласие с настоящими Правилами.
          </p>
        </div>

        <button
          aria-controls="rules-content"
          aria-expanded={isRulesOpen}
          className="group mt-1 flex h-12 w-12 items-center justify-center rounded-full border border-[#1f5ba8]/20 bg-white/80 text-[#1f5ba8] shadow-[0_0.8rem_1.8rem_-1.3rem_rgba(15,23,42,0.45)] transition hover:-translate-y-0.5 hover:bg-white sm:h-14 sm:w-14"
          onClick={() => setIsRulesOpen((currentValue) => !currentValue)}
          type="button"
        >
          <svg
            className={`h-6 w-6 transition-transform duration-300 ${isRulesOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          </svg>
          <span className="sr-only">{isRulesOpen ? 'Свернуть правила' : 'Раскрыть правила'}</span>
        </button>
      </div>

      <div
        aria-hidden={!isRulesOpen}
        className={`grid overflow-hidden transition-[grid-template-rows,opacity,transform] duration-500 ease-out ${
          isRulesOpen ? 'grid-rows-[1fr] opacity-100 translate-y-0' : 'grid-rows-[0fr] opacity-0 -translate-y-2'
        }`}
        id="rules-content"
      >
        <div className="min-h-0 overflow-hidden">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] mt-3">
            <article className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/70 shadow-[0_1rem_2.2rem_-1.7rem_rgba(15,23,42,0.45)]">
              <ol className="divide-y divide-slate-200/80">
                {rules.map((rule, index) => (
                  <li className="bg-white/65 px-4 py-5 sm:px-5" key={rule.title}>
                    <div className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)]">
                      <div>
                        <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-[#1f5ba8] text-lg font-black text-white shadow-[0_0.8rem_1.4rem_-0.8rem_rgba(31,91,168,0.7)] transition group-hover:-translate-y-0.5">
                          {index + 1}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className="text-lg font-extrabold leading-tight text-brand-ink sm:text-xl">
                            {rule.title}
                          </h3>
                        </div>

                        <ol className="mt-4 space-y-2 rounded-2xl bg-[#f4f7fb] px-4 py-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                          {rule.items.map((item, itemIndex) => (
                            <li className="grid grid-cols-[auto_minmax(0,1fr)] gap-2" key={`${index}-${itemIndex}`}>
                              <span className="font-bold text-brand-ink">
                                {index + 1}.{itemIndex + 1}.
                              </span>
                              <span>
                                {typeof item === 'string' ? (
                                  item
                                ) : (
                                  <>
                                    <strong className="font-extrabold text-brand-ink">{item.strong}</strong>
                                    {item.text}
                                  </>
                                )}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </article>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:self-start">
              <ImageStub
                alt={rulesIllustration.alt}
                className="h-[18rem] rounded-[1.75rem] border border-white/70 bg-white/80 sm:h-[20rem] lg:h-[22rem]"
                imageFit="contain"
                label={rulesIllustration.label}
                labelClassName="text-xl sm:text-2xl"
                src={rulesIllustration.src}
              />

              <div className="rounded-[1.75rem] border border-white/70 bg-white/80 px-5 py-5 text-brand-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:px-6 sm:py-6">
                <h3 className="text-xl font-extrabold leading-tight">Немного от нас</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  Если какой-то пункт требует уточнения, обратитесь к администратору до начала тренировки, аренды или
                  другого пользования услугами клуба.
                </p>
                <div className="mt-5 rounded-2xl bg-[#1f5ba8] px-4 py-3 text-sm font-bold leading-relaxed text-white shadow-[0_0.8rem_1.4rem_-1rem_rgba(31,91,168,0.85)]">
                  Правила помогают сохранять комфортную атмосферу и бережное отношение к пространству клуба.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
