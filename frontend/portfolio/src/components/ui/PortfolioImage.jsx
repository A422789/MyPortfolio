import media from '../../generated/media.json';

export default function PortfolioImage({ src, alt, sizes = '(min-width: 1024px) 50vw, 100vw', loading = 'lazy', ...props }) {
  const asset = media[decodeURI(src ?? '')] ?? media[src];
  return (
    <img
      src={asset?.src ?? src}
      srcSet={asset?.variants?.map((variant) => `${variant.src} ${variant.width}w`).join(', ')}
      sizes={asset?.variants ? sizes : undefined}
      width={asset?.width}
      height={asset?.height}
      loading={loading}
      decoding="async"
      alt={alt}
      {...props}
    />
  );
}
