export function PrimaryAction({ className = '' }) {
  return (
    <a
      className={`landing-cta inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-base font-semibold uppercase tracking-wide text-white sm:gap-3 sm:px-10 sm:py-3 sm:text-2xl ${className}`}
      href="https://rakettka.rubitime.ru/"
      rel="noopener noreferrer"
      target="_blank"
    >
      Бронь стола
      <span className="text-base leading-none sm:text-xl">›</span>
    </a>
  );
}
