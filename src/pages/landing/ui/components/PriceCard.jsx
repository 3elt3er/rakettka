export function PriceCard({ service, className = '' }) {
  return (
    <article
      className={`mx-auto flex h-full min-h-[25rem] w-full max-w-[24rem] flex-col overflow-hidden rounded-lg bg-white sm:min-h-[28rem] lg:min-h-[32rem] ${className}`}
    >
      <div className="relative h-[17rem] shrink-0 overflow-hidden bg-[#f4f7fb] sm:h-[19rem] lg:h-[23rem]">
        <img
          alt={service.image.alt}
          className={`pointer-events-none absolute left-1/2 max-w-none -translate-x-1/2 select-none ${service.imageOffsetClassName ?? 'top-0'} w-full`}
          decoding="async"
          draggable={false}
          fetchpriority="low"
          loading="lazy"
          src={service.image.src}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex min-h-[5.75rem] items-end justify-center bg-gradient-to-t from-[#17345d]/90 via-[#17345d]/45 to-transparent px-4 pb-5 pt-10 sm:min-h-[6.25rem] lg:min-h-[7rem]">
          <h4 className="max-w-[18rem] text-center text-lg font-bold leading-tight tracking-normal text-white sm:text-xl lg:text-[1.6rem] lg:tracking-[-0.03em]">
            {service.title}
          </h4>
        </div>
      </div>

      <div className="grid flex-1 grid-rows-2 gap-3 px-4 py-4 text-brand-ink sm:px-5 lg:gap-4 lg:py-5">
        <div className="grid content-start gap-1 text-[0.95rem] sm:text-base lg:grid-cols-[minmax(0,1fr)_minmax(7.8rem,auto)] lg:items-start lg:gap-3">
          <span className="leading-snug">{service.onceLabel}</span>
          <span className="min-w-0 text-[1.2rem] font-black leading-tight lg:text-right lg:text-[1.3rem]">
            {service.oncePrice}
          </span>
        </div>

        <div className="grid content-start gap-1 text-[0.95rem] sm:text-base lg:grid-cols-[minmax(0,1fr)_minmax(7.8rem,auto)] lg:items-start lg:gap-3">
          <span className="leading-snug">{service.packLabel}</span>
          <span className="min-w-0 text-[1.2rem] font-black leading-tight lg:text-right lg:text-[1.3rem]">
            {service.packPrice}
          </span>
        </div>
      </div>
    </article>
  );
}
