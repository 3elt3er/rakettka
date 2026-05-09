export function PriceCard({ service, className = '' }) {
  return (
    <article
      className={`mx-auto flex h-full min-h-[32rem] w-full max-w-[24rem] flex-col overflow-hidden rounded-[1.5rem] bg-white ${className}`}
    >
      <div className="relative h-[23rem] shrink-0 overflow-hidden bg-[#f4f7fb]">
        <img
          alt={service.image.alt}
          className={`pointer-events-none absolute left-1/2 max-w-none -translate-x-1/2 select-none ${service.imageOffsetClassName ?? 'top-0'} w-full`}
          decoding="async"
          draggable={false}
          fetchpriority="low"
          loading="lazy"
          src={service.image.src}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-[7rem] items-center justify-center px-5">
          <h4 className="text-center text-[1.45rem] font-bold leading-tight tracking-[-0.03em] text-white sm:text-[1.6rem]">
            {service.title}
          </h4>
        </div>
      </div>

      <div className="grid flex-1 grid-rows-2 gap-4 px-4 py-5 text-brand-ink sm:px-5">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(7.8rem,auto)] items-start gap-3 text-sm sm:text-base">
          <span className="leading-[1.2]">{service.onceLabel}</span>
          <span className="min-w-0 text-right text-[1.15rem] font-black leading-tight sm:text-[1.3rem]">
            {service.oncePrice}
          </span>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_minmax(7.8rem,auto)] items-start gap-3 text-sm sm:text-base">
          <span className="leading-[1.2]">{service.packLabel}</span>
          <span className="min-w-0 text-right text-[1.15rem] font-black leading-tight sm:text-[1.3rem]">
            {service.packPrice}
          </span>
        </div>
      </div>
    </article>
  );
}
