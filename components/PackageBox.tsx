import type { Fragrance } from "@/data/fragrances";

/**
 * 商品写真が届くまでの、CSS で描いたパッケージ。
 * 実際の箱（淡い色・渦の印・縦書きの出雲香・菱形の香り名）の構成を静かに写す。
 */
export default function PackageBox({ fragrance: f, className }: { fragrance: Fragrance; className?: string }) {
  return (
    <div className={`package ${className ?? ""}`} style={{ "--c": f.color } as React.CSSProperties} aria-hidden="true">
      <svg className="package__mark" viewBox="0 0 40 24" fill="none">
        <path
          d="M4 14c0-5 4-8 8-8s7 3 7 6-2 5-5 5-4-2-4-4 1-3 3-3M36 10c0 5-4 8-8 8s-7-3-7-6 2-5 5-5 4 2 4 4-1 3-3 3"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
      <span className="package__brand">出雲香</span>
      <span className="package__en">Healing Incense from Izumo</span>
      <span className="package__diamond">
        <span className={f.name.length > 1 ? "is-long" : ""}>{f.name}</span>
      </span>
    </div>
  );
}
