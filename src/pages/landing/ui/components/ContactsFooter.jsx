import { PrimaryAction } from '@/pages/landing/ui/components/PrimaryAction';

export function ContactsFooter() {
  return (
    <section className="" id="contacts">
      <div className="relative w-full overflow-hiddend ">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            {/* Более светлый синий фон */}
            <linearGradient id="footerBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16365f" />
              <stop offset="55%" stopColor="#0f2b4f" />
              <stop offset="100%" stopColor="#0b1e38" />
            </linearGradient>

            {/* Верхний мягкий свет */}
            <radialGradient id="footerGlowTop" cx="50%" cy="-15%" r="90%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
              <stop offset="35%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="65%" stopColor="rgba(255,255,255,0.00)" />
            </radialGradient>

            {/* Лёгкая линия-акцент по дуге */}
            <linearGradient id="footerArcStroke" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(255,255,255,0.00)" />
              <stop offset="0.5" stopColor="rgba(255,255,255,0.28)" />
              <stop offset="1" stopColor="rgba(255,255,255,0.00)" />
            </linearGradient>

            <filter id="arcBlur" x="-20%" y="-60%" width="140%" height="220%">
              <feGaussianBlur stdDeviation="2.2" />
            </filter>
          </defs>

          <path d="M0 85 C260 10 940 10 1200 85 L1200 340 L0 340 Z" fill="url(#footerBg)" />

          <path d="M0 85 C260 10 940 10 1200 85 L1200 340 L0 340 Z" fill="url(#footerGlowTop)" />

          <path
            d="M40 68 C300 28 900 28 1160 68"
            fill="none"
            stroke="url(#footerArcStroke)"
            strokeWidth="2"
            filter="url(#arcBlur)"
            opacity="0.9"
          />
        </svg>

        <div className="relative z-10 px-6 pb-6 pt-12 text-sm text-slate-100 sm:px-10 sm:pb-7 sm:pt-14">
          <div className="flex justify-center pb-6">
            <PrimaryAction className="absolute min-w-[16rem] px-10 py-3 text-xl sm:min-w-[22rem] sm:text-[2rem] top-0" />
          </div>

          <div className="grid gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div className="space-y-3 text-xl font-bold">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                  ⌖
                </span>
                <span className="text-slate-100/90">г. Москва, ул. Нежинская, д. 17, к. 4, 3 этаж</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                  ✉
                </span>
                <span className="text-slate-100/90">TTRakeTTka@yandex.ru</span>
              </div>
            </div>

            <div className="hidden h-12 w-px bg-white/10 sm:block" />

            <div className="text-xl font-bold space-y-3 sm:text-right">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                  ✆
                </span>
                <span className="text-slate-100/90">+7 (906) 066 88 06</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                  TG
                </span>
                <span className="text-slate-100/90">RakeTTka</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
