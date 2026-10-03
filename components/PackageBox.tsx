import Image from "next/image";
import type { Fragrance } from "@/data/fragrances";

type Props = {
  fragrance: Fragrance;
  className?: string;
  /** 表示幅の目安（next/image の sizes） */
  sizes?: string;
};

/**
 * 商品のパッケージ。
 * 正式な商品写真があれば写真を、比率を保ったまま箱全体が見えるように表示する。
 * 写真が届くまでは、実際の箱（淡い色・渦の印・縦書きの出雲香・菱形の香り名）の構成を CSS で静かに写す。
 */
export default function PackageBox({ fragrance: f, className, sizes = "160px" }: Props) {
  if (f.image) {
    return (
      <div
        className={`package package--photo ${className ?? ""}`}
        style={{ "--ratio": f.image.height / f.image.width } as React.CSSProperties}
      >
        <Image src={f.image.src} alt={f.image.alt} fill sizes={sizes} className="package__img" />
      </div>
    );
  }

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
