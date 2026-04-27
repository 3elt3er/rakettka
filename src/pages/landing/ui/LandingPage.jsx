import { AboutSection } from '@/pages/landing/ui/components/AboutSection';
import { ContactsFooter } from '@/pages/landing/ui/components/ContactsFooter';
import { HeroBanner } from '@/pages/landing/ui/components/HeroBanner';
import { PricingSection } from '@/pages/landing/ui/components/PricingSection';
import { RulesSection } from '@/pages/landing/ui/components/RulesSection';
import { ScheduleSection } from '@/pages/landing/ui/components/ScheduleSection';
import { TopBar } from '@/pages/landing/ui/components/TopBar';

export function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-200 px-4 sm:px-6" id="top">
      <div className="mx-auto w-full max-w-[75rem]">
        <article className="landing-shell">
          <TopBar />
          <HeroBanner />

          <div className="space-y-12 bg-[#f4f7fb] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <AboutSection />
            <div className="-mx-4 h-px bg-slate-300 sm:-mx-6 lg:-mx-8" />
            <PricingSection />
            <div className="-mx-4 h-px bg-slate-300 sm:-mx-6 lg:-mx-8" />
            <ScheduleSection />
            <div className="-mx-4 h-px bg-slate-300 sm:-mx-6 lg:-mx-8" />
            <RulesSection />
          </div>

          <ContactsFooter />
        </article>
      </div>
    </main>
  );
}
