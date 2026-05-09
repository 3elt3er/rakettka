const navItems = [
  { id: 'about', label: 'О клубе' },
  { id: 'pricing', label: 'Цены' },
  { id: 'schedule', label: 'Расписание' },
  { id: 'rules', label: 'Правила' },
];

function TelegramIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M21.2 4.36 18.1 19.02c-.23 1.04-.84 1.3-1.7.82l-4.71-3.47-2.27 2.19c-.25.25-.46.46-.95.46l.34-4.84 8.82-7.97c.38-.34-.08-.53-.59-.19L6.14 12.9l-4.69-1.47c-1.02-.32-1.04-1.02.21-1.51L20.02 2.8c.86-.32 1.62.19 1.18 1.56Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.32.57 3.57.57.56 0 1 .44 1 1V20c0 .56-.44 1-1 1C10.06 21 3 13.94 3 5c0-.56.44-1 1-1h3.5c.56 0 1 .44 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TopBar() {
  return (
    <header className="landing-topbar sticky top-0 z-20 border-b border-slate-500/30 px-5 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <a aria-label="RakeTTka" className="brand-logo shrink-0 text-[1.45rem] leading-none sm:text-[1.7rem] lg:text-[2rem]" href="#top">
          Rake<span className="brand-logo-accent">TT</span>ka
        </a>

        <nav className="hidden min-w-0 flex-1 items-center justify-evenly px-4 text-[0.9rem] font-extrabold tracking-tight text-slate-100 md:flex lg:px-8 lg:text-[1.05rem] xl:px-12 xl:text-[1.12rem]">
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

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-2.5">
          <a
            aria-label="Telegram RakeTTka"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-[#4d82dc] to-[#3d6fca] text-white shadow-[0_0.75rem_1.4rem_-0.9rem_rgba(75,129,220,0.9)] transition hover:-translate-y-0.5 hover:from-[#5d94ee] hover:to-[#4e7fdd] sm:h-8 sm:w-8 lg:h-9 lg:w-9"
            href="https://t.me/RakeTTka"
            rel="noopener noreferrer"
            target="_blank"
          >
            <TelegramIcon />
          </a>

          <a
            aria-label="Позвонить в RakeTTka"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-[#4d82dc] to-[#3d6fca] text-white shadow-[0_0.75rem_1.4rem_-0.9rem_rgba(75,129,220,0.9)] transition hover:-translate-y-0.5 hover:from-[#5d94ee] hover:to-[#4e7fdd] sm:h-8 sm:w-8 lg:h-9 lg:w-9"
            href="tel:+79060668806"
          >
            <PhoneIcon />
          </a>
        </div>
      </div>

      <nav className="mt-3 flex flex-wrap items-center justify-evenly gap-x-4 gap-y-1 border-t border-white/10 pt-2 text-sm font-extrabold text-slate-100 md:hidden">
        {navItems.map((item) => (
          <a className="transition hover:text-white" href={`#${item.id}`} key={`mobile-${item.id}`}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
