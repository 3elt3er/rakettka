import { PrimaryAction } from '@/pages/landing/ui/components/PrimaryAction';

const footerIconClassName =
  'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#4d82dc] to-[#3d6fca] text-white shadow-[0_1rem_2rem_-1rem_rgba(75,129,220,0.9)] ring-1 ring-white/15 sm:h-11 sm:w-11';

function LocationIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M12 12.2a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M4.5 6.75h15v10.5h-15V6.75Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="m5 7.5 7 5.2 7-5.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.32.57 3.57.57.56 0 1 .44 1 1V20c0 .56-.44 1-1 1C10.06 21 3 13.94 3 5c0-.56.44-1 1-1h3.5c.56 0 1 .44 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M21.2 4.36 18.1 19.02c-.23 1.04-.84 1.3-1.7.82l-4.71-3.47-2.27 2.19c-.25.25-.46.46-.95.46l.34-4.84 8.82-7.97c.38-.34-.08-.53-.59-.19L6.14 12.9l-4.69-1.47c-1.02-.32-1.04-1.02.21-1.51L20.02 2.8c.86-.32 1.62.19 1.18 1.56Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ContactsFooter() {
  return (
    <section className="sticky bottom-0 z-20" id="contacts">
      <div className="relative w-full overflow-hidden">
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

        <div className="relative z-10 px-6 pb-2 pt-12 text-sm text-slate-100">
          <div className="flex justify-center pb-6">
            <PrimaryAction className="absolute min-w-[16rem] px-10 py-3 text-xl sm:min-w-[22rem] sm:text-[2rem] top-0" />
          </div>

          <div className="grid gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div className="space-y-3 text-xl font-bold">
              <div className="flex items-center gap-3">
                <span className={footerIconClassName}>
                  <LocationIcon />
                </span>
                <span className="text-slate-100/90">г. Москва, ул. Нежинская, д. 17, к. 4, 3 этаж</span>
              </div>

              <div className="flex items-center gap-3">
                <span className={footerIconClassName}>
                  <MailIcon />
                </span>
                <span className="text-slate-100/90">TTRakeTTka@yandex.ru</span>
              </div>
            </div>

            <div className="hidden h-12 w-px bg-white/10 sm:block" />

            <div className="text-xl font-bold space-y-3 sm:text-right">
              <div className="flex items-center gap-3">
                <span className={footerIconClassName}>
                  <PhoneIcon />
                </span>
                <span className="text-slate-100/90">+7 (906) 066 88 06</span>
              </div>

              <div className="flex items-center gap-3">
                <span className={footerIconClassName}>
                  <TelegramIcon />
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
