import Link from "next/link";
import SmokeEffect from "./SmokeEffect";
import { type Fragrance, romanNumerals } from "@/data/fragrances";

/**
 * 一つの香り = 一つの章。カードではなく、画面全体を使った見開きとして構成する。
 */
export default function FragranceCard({ fragrance: f, index }: { fragrance: Fragrance; index: number }) {
  const titleId = `chapter-${f.slug}`;
  return (
    <article
      className="chapter"
      style={{ "--c": f.color } as React.CSSProperties}
      aria-labelledby={titleId}
      data-index={index}
    >
      <div className="chapter__light" aria-hidden="true" />
      <SmokeEffect className="chapter__smoke" />

      <p className="chapter__num" aria-hidden="true">
        <span>{romanNumerals[f.order - 1]}</span>
        <span className="chapter__num-total">/ VII</span>
      </p>

      <h3 id={titleId} className={`chapter__name ${f.name.length > 1 ? "is-long" : ""}`} data-reveal>
        {f.name}
      </h3>

      <div className="chapter__body">
        <p className="chapter__note" data-reveal>
          <span className="chapter__note-en" lang="en">
            {f.noteEn}
          </span>
          <span className="chapter__note-ja">{f.note}</span>
        </p>
        <p className="chapter__copy" data-reveal>
          {f.copy}
        </p>
        <dl className="chapter__moment" data-reveal>
          <dt>香りを焚く時間</dt>
          <dd>{f.moment}</dd>
        </dl>
        <Link href={`/fragrances/${f.slug}`} className="link-line" data-reveal>
          この香りを詳しく見る<span className="sr-only">（{f.name}）</span>
        </Link>
      </div>
    </article>
  );
}
