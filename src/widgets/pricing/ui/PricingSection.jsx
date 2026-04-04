import { services } from '@/entities/service/model/services';
import { Button } from '@/shared/ui/Button';
import { SectionTitle } from '@/shared/ui/SectionTitle';

export function PricingSection() {
  return (
    <section id="pricing" className="space-y-5">
      <SectionTitle>Стоимость услуг</SectionTitle>

      <div className="grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <article key={service.id} className="card-surface overflow-hidden">
            <div className="bg-gradient-to-r from-brand-100 to-brand-200 px-4 py-3 text-center text-4xl">
              {service.emoji}
            </div>
            <div className="space-y-2 p-4">
              <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">1 тренировка / час</span>
                <span className="font-bold text-slate-900">{service.oncePrice}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">{service.packLabel}</span>
                <span className="font-bold text-slate-900">{service.packPrice}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <Button>Бронь стола</Button>
      </div>
    </section>
  );
}
