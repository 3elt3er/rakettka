export function PriceCard({ service, className = '' }) {
  return (
    <article className={`flex h-full flex-col overflow-visible pt-24 ${className}`}>
      <div className="relative mx-4 -mb-6 h-[20.5rem] overflow-visible">
        <img
          alt={service.image.alt}
          className={`pointer-events-none absolute bottom-0 left-1/2 w-full -translate-x-1/2 origin-bottom select-none ${service.imageClassName ?? ''}`}
          draggable={false}
          src={service.image.src}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 bg-[#214c80]/92 px-4 py-14">
          <h3 className="text-center text-[1.45rem] font-semibold leading-tight text-white">{service.title}</h3>
        </div>
      </div>

      <div className="relative z-10 mx-4 -mt-3 grid h-[15rem] grid-rows-[4.75rem_5.5rem] content-start gap-3 rounded-b-[1.6rem] bg-white px-5 py-4 text-brand-ink shadow-[0_0.8rem_1.8rem_-1.3rem_rgba(15,23,42,0.35)] before:absolute before:-top-3 before:left-0 before:right-0 before:h-5 before:bg-white before:content-['']">
        <div className="grid h-[4.75rem] grid-cols-[minmax(0,1fr)_auto] items-start gap-3 text-lg">
          <span className="leading-[1.2]">{service.onceLabel}</span>
          <span className="whitespace-nowrap text-[2.1rem] font-black leading-none">{service.oncePrice}</span>
        </div>

        <div className="grid h-[5.5rem] grid-cols-[minmax(0,1fr)_auto] items-start gap-3 text-lg">
          <span className="leading-[1.2]">{service.packLabel}</span>
          <span className="whitespace-nowrap text-[2.1rem] font-black leading-none">{service.packPrice}</span>
        </div>
      </div>
    </article>
  );
}
