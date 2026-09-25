/**
 * CSS だけで描く、ひと筋の香煙。
 * WebGL を使うほどでもない小さな場面（香りの章・商品）で使う。
 */
export default function SmokeEffect({ className }: { className?: string }) {
  return (
    <div className={`smoke ${className ?? ""}`} aria-hidden="true">
      <span className="smoke__wisp" />
      <span className="smoke__wisp" />
      <span className="smoke__wisp" />
      <span className="smoke__stem" />
    </div>
  );
}
