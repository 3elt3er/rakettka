import { Container } from '@/shared/ui/Container';

export function SiteFooter() {
  return (
    <footer id="contacts" className="rounded-b-3xl bg-slate-900 py-5 text-slate-100">
      <Container>
        <div className="grid gap-4 text-sm sm:grid-cols-2">
          <div className="space-y-1">
            <p>г. Москва, ул. Теннисная, 15</p>
            <p>info@rakettka.ru</p>
          </div>
          <div className="space-y-1 text-left sm:text-right">
            <p>+7 (900) 123-45-67</p>
            <p>info@rakettka.ru</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
