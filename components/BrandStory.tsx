import ImageSlot from "./ImageSlot";
import { images } from "@/data/images";

/**
 * SCENE 05 — 出雲香が生まれた理由。
 * 会社紹介ではなく、ひとりの願いから始まった物語として。生成りの紙のような明るい面で温度を出す。
 */
export default function BrandStory() {
  return (
    <section id="about" className="story" aria-labelledby="story-title">
      <p className="eyebrow story__eyebrow" data-reveal lang="en">
        Our Story
      </p>
      <p className="story__label" data-reveal>
        出雲香が生まれた理由
      </p>

      <h2 id="story-title" className="story__quote" data-reveal>
        <span>香りで少しでも</span>
        <span>あなたの心が</span>
        <span>癒されますように。</span>
      </h2>

      <div className="story__body">
        <ImageSlot slot={images.story} sizes="(min-width: 1024px) 34vw, 80vw" className="story__photo" />
        <p data-reveal>
          出雲香は、
          <br />
          コロナ禍という先の見えない時代に生まれました。
        </p>
        <p data-reveal>
          誰かの心が、香りによって
          <br />
          ほんの少し軽くなれば。
        </p>
        <p data-reveal>
          そんな想いを、出雲という土地から
          <br />
          届けるために生まれた香りです。
        </p>
        <p data-reveal>
          父やスタッフに背中を押されながら、
          <br />
          その想いは少しずつ、かたちになっていきました。
        </p>
      </div>
    </section>
  );
}
