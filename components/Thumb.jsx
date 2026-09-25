export default function Thumb({ src, alt, className = "" }) {
  return (
    <div className={`flex items-center justify-center overflow-hidden bg-panel-2 ${className}`}>
      {src ? <img src={src} alt={alt} loading="lazy" className="h-full w-full object-contain" /> : null}
    </div>
  );
}
