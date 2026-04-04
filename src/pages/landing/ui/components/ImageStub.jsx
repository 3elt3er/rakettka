export function ImageStub({ alt = '', className = '', imageClassName = '', label, labelClassName = '', src }) {
  return (
    <div className={`landing-image-stub relative overflow-hidden ${className}`}>
      {src ? (
        <img alt={alt || label} className={`h-full w-full object-cover object-center ${imageClassName}`} src={src} />
      ) : (
        <div className="h-full w-full" />
      )}
    </div>
  );
}
