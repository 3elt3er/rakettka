export function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full bg-brand-700 px-6 py-3 text-base font-semibold text-white transition hover:bg-brand-900 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
