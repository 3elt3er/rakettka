import logoImage from '@/shared/assets/Лого.webp';

const navItems = [
  { id: 'about', label: 'О клубе' },
  { id: 'pricing', label: 'Цены' },
  { id: 'schedule', label: 'Расписание' },
  { id: 'rules', label: 'Правила' },
];

function TelegramIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="none">
      <path
        d="M21.2 4.36 18.1 19.02c-.23 1.04-.84 1.3-1.7.82l-4.71-3.47-2.27 2.19c-.25.25-.46.46-.95.46l.34-4.84 8.82-7.97c.38-.34-.08-.53-.59-.19L6.14 12.9l-4.69-1.47c-1.02-.32-1.04-1.02.21-1.51L20.02 2.8c.86-.32 1.62.19 1.18 1.56Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.32.57 3.57.57.56 0 1 .44 1 1V20c0 .56-.44 1-1 1C10.06 21 3 13.94 3 5c0-.56.44-1 1-1h3.5c.56 0 1 .44 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TopBar() {
  return (
    <header className="landing-topbar sticky top-0 z-20 overflow-visible border-b border-slate-500/30 px-4 pb-6 pt-5">
      <a className="absolute left-[0rem] top-[-4rem] z-10" href="#top">
        <img
          alt="RakeTTka"
          className="h-60 w-auto"
          decoding="async"
          fetchpriority="high"
          loading="eager"
          src={logoImage}
        />
      </a>

      <div className="flex items-center gap-3 pl-[7rem] sm:pl-[9.5rem] lg:min-h-[4rem] lg:gap-5 lg:pl-[15rem] xl:pl-[19rem]">
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 px-2 text-[1.2rem] font-bold tracking-tight text-slate-100 md:flex lg:gap-5 lg:text-[1.35rem] xl:gap-6 xl:text-[1.45rem]">
          {navItems.map((item) => (
            <a
              className="truncate whitespace-nowrap text-slate-100/95 transition hover:-translate-y-0.5 hover:text-white"
              href={`#${item.id}`}
              key={item.id}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4">
          <a
            aria-label="Telegram RakeTTka"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#4d82dc] to-[#3d6fca] text-white shadow-[0_1rem_2rem_-1rem_rgba(75,129,220,0.9)] transition hover:-translate-y-0.5 hover:from-[#5d94ee] hover:to-[#4e7fdd] sm:h-9 sm:w-9 lg:h-14 lg:w-14"
            href="https://t.me/RakeTTka"
            rel="noopener noreferrer"
            target="_blank"
          >
            <TelegramIcon />
          </a>

          <a
            aria-label="Позвонить в RakeTTka"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#4d82dc] to-[#3d6fca] text-white shadow-[0_1rem_2rem_-1rem_rgba(75,129,220,0.9)] transition hover:-translate-y-0.5 hover:from-[#5d94ee] hover:to-[#4e7fdd] sm:h-9 sm:w-9 lg:h-14 lg:w-14"
            href="tel:+79060668806"
          >
            <PhoneIcon />
          </a>
        </div>
      </div>

      <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/10 pt-3 pl-[7rem] text-base font-semibold text-slate-100 sm:pl-[9.5rem] md:hidden">
        {navItems.map((item) => (
          <a className="transition hover:text-white" href={`#${item.id}`} key={`mobile-${item.id}`}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
