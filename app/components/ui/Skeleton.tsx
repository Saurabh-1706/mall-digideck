export default function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-shimmer bg-surface ${className}`} />
  );
}
