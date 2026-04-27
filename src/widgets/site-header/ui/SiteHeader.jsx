import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import logoImage from '@/shared/assets/Лого.webp';

const navItems = [
  { id: 'about', label: 'О клубе' },
  { id: 'schedule', label: 'Расписание' },
  { id: 'pricing', label: 'Цены' },
  { id: 'contacts', label: 'Контакты' },
];

export function SiteHeader() {
  return (
    <header className="rounded-t-3xl bg-slate-900/95 py-4 text-slate-100">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <img alt="RakeTTka" className="h-14 w-auto" src={logoImage} />
          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="transition hover:text-brand-200">
                {item.label}
              </a>
            ))}
          </nav>
          <Button
            className="bg-brand-500 px-5 py-2 text-sm hover:bg-brand-700"
            onClick={() => window.open('https://rakettka.rubitime.ru/', '_blank', 'noopener,noreferrer')}
          >
            Запись
          </Button>
        </div>
      </Container>
    </header>
  );
}
