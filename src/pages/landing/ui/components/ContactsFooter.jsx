import { useState } from 'react';

const bookingUrl = 'https://rakettka.rubitime.ru/';

const footerIconClassName =
  'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#4d82dc] to-[#3d6fca] text-white shadow-[0_0.7rem_1.2rem_-0.8rem_rgba(75,129,220,0.9)] ring-1 ring-white/15 sm:h-8 sm:w-8';

function LocationIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 sm:h-[1.1rem] sm:w-[1.1rem]" fill="none" viewBox="0 0 24 24">
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

function PhoneIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 sm:h-[1.1rem] sm:w-[1.1rem]" fill="none" viewBox="0 0 24 24">
      <path
        d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.32.57 3.57.57.56 0 1 .44 1 1V20c0 .56-.44 1-1 1C10.06 21 3 13.94 3 5c0-.56.44-1 1-1h3.5c.56 0 1 .44 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ContactsFooter() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isRulesAccepted, setIsRulesAccepted] = useState(false);

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setIsRulesAccepted(false);
  };

  const openBookingService = () => {
    if (!isRulesAccepted) return;

    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
    closeBookingModal();
  };

  return (
    <section className="sticky bottom-0 z-20" id="contacts">
      <div className="landing-footer relative border-t border-white/10 px-4 pb-3 pt-7 text-xs font-semibold text-slate-100 sm:px-6 sm:pb-4 sm:pt-8 sm:text-sm">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <button
            className="inline-flex min-h-8 items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-[#4d82dc] to-[#2f62b4] px-6 py-2 text-base font-black uppercase tracking-wide text-white shadow-[0_1rem_1.8rem_-0.9rem_rgba(47,98,180,0.95)] ring-2 ring-white/25 transition hover:-translate-y-0.5 hover:from-[#5d94ee] hover:to-[#3d72c8] sm:px-11 sm:text-lg"
            onClick={() => setIsBookingModalOpen(true)}
            type="button"
          >
            Аренда стола
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-around gap-x-8 gap-y-2">
          <div className="flex items-center gap-2">
            <span className={footerIconClassName}>
              <LocationIcon />
            </span>
            <span className="text-slate-100/90">г. Москва, ул. Нежинская, д. 17, к. 4, 3 этаж</span>
          </div>

          <div className="flex items-center gap-2">
            <span className={footerIconClassName}>
              <PhoneIcon />
            </span>
            <a className="text-slate-100/90 transition hover:text-white" href="tel:+79060668806">
              +7 (906) 066 88 06
            </a>
          </div>
        </div>
      </div>

      {isBookingModalOpen && (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4"
          role="dialog"
        >
          <div className="w-full max-w-md rounded-[1.5rem] bg-white p-5 text-brand-ink shadow-[0_1.4rem_3rem_-1.4rem_rgba(15,23,42,0.75)] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker">Бронирование</p>
                <h2 className="mt-1 text-2xl font-extrabold leading-tight">Аренда стола</h2>
              </div>

              <button
                aria-label="Закрыть окно бронирования"
                className="icon-button h-9 w-9 text-xl"
                onClick={closeBookingModal}
                type="button"
              >
                ×
              </button>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl bg-[#f4f7fb] px-4 py-4 text-sm font-bold leading-relaxed text-brand-ink">
              <input
                checked={isRulesAccepted}
                className="mt-1 h-4 w-4 accent-[#1f5ba8]"
                onChange={(event) => setIsRulesAccepted(event.target.checked)}
                type="checkbox"
              />
              <span>С правилами клуба ознакомлен</span>
            </label>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button className="secondary-button" onClick={closeBookingModal} type="button">
                Отмена
              </button>
              <button className="primary-button" disabled={!isRulesAccepted} onClick={openBookingService} type="button">
                Перейти к бронированию
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
