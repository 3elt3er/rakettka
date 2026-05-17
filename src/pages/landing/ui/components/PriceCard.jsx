export function PriceCard({ service, className = '' }) {
  const labelClassName =
    'min-w-0 text-[clamp(0.78rem,3.6vw,1rem)] leading-tight [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden lg:block lg:overflow-visible lg:text-base';

  return (
    <article
      className={`mx-auto flex h-full min-h-[25rem] w-full max-w-[34rem] flex-col overflow-hidden rounded-lg bg-white sm:min-h-[28rem] lg:min-h-[32rem] ${className}`}
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
          <h4 className="w-full max-w-[32rem] whitespace-nowrap text-center text-[clamp(1.1rem,5vw,1.45rem)] font-extrabold leading-tight tracking-normal text-white lg:max-w-[24rem] lg:whitespace-normal lg:text-[1.45rem] lg:tracking-normal xl:text-[1.5rem]">
            {service.title}
          </h4>
        </div>
      </div>

      <div className="grid flex-1 grid-rows-2 gap-3 px-4 py-4 text-brand-ink sm:px-5 lg:gap-4 lg:py-5">
        <div className="grid grid-cols-[minmax(0,1fr)_max-content] items-start gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(8rem,auto)]">
          <span className={labelClassName}>
            {service.onceLabel}
          </span>
          <span className="whitespace-nowrap text-right text-[clamp(0.9rem,4vw,1.3rem)] font-black leading-tight">
            {service.oncePrice}
          </span>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_max-content] items-start gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(8rem,auto)]">
          <span className={labelClassName}>
            {service.packLabel}
          </span>
          <span className="whitespace-nowrap text-right text-[clamp(0.9rem,4vw,1.3rem)] font-black leading-tight">
            {service.packPrice}
          </span>
        </div>
      </div>
    </article>
  );
}
