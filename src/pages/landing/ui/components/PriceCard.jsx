export function PriceCard({ service, className = '' }) {
  return (
    <article
      className={`mx-auto flex h-full min-h-[34rem] w-full max-w-[24rem] flex-col overflow-hidden rounded-[1.75rem] bg-white ${className}`}
    >
      <div className="relative h-[25rem] shrink-0 overflow-hidden bg-[#f4f7fb]">
        <img
          alt={service.image.alt}
          className={`pointer-events-none absolute left-1/2 max-w-none -translate-x-1/2 select-none ${service.imageOffsetClassName ?? 'top-0'} w-full`}
          decoding="async"
          draggable={false}
          fetchpriority="low"
          loading="lazy"
          src={service.image.src}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-[8rem] items-center justify-center px-5">
          <h4 className="text-center text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-white">
            {service.title}
          </h4>
        </div>
      </div>

      <div className="grid flex-1 grid-rows-2 gap-4 px-5 py-6 text-brand-ink">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 text-lg">
          <span className="leading-[1.2]">{service.onceLabel}</span>
          <span className="whitespace-nowrap text-[2rem] font-black leading-none sm:text-[2.15rem]">
            {service.oncePrice}
          </span>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 text-lg">
          <span className="leading-[1.2]">{service.packLabel}</span>
          <span className="whitespace-nowrap text-[2rem] font-black leading-none sm:text-[2.15rem]">
            {service.packPrice}
          </span>
        </div>
      </div>
    </article>
  );
}
