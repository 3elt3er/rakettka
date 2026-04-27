export function ImageStub({
  alt = '',
  className = '',
  imageClassName = '',
  imageFit = 'cover',
  label,
  labelClassName = '',
  src,
}) {
  const objectFitClassName = imageFit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <div className={`landing-image-stub relative overflow-hidden ${className}`}>
      {src ? (
        <img
          alt={alt || label}
          className={`h-full w-full ${objectFitClassName} object-center ${imageClassName}`}
          decoding="async"
          loading="lazy"
          src={src}
        />
      ) : (
        <div className="h-full w-full" />
      )}
    </div>
  );
}
