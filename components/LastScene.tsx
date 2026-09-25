import Atmosphere from "./Atmosphere";
import ImageSlot, { hasImage } from "./ImageSlot";
import { images } from "@/data/images";
import { site } from "@/data/site";

/**
 * LAST SCENE — 再び、夕暮れの稲佐の浜へ。
 * 香煙が空へほどけ、言葉だけが残る。
 */
export default function LastScene() {
  const photo = hasImage(images.inasaDusk);
  return (
    <section className="last" data-atmo-host aria-labelledby="last-title">
      <div className="last__stage">
        <ImageSlot slot={images.inasaDusk} className="last__photo" />
        <Atmosphere mode="dusk" overlay={photo} />
      </div>
      <div className="last__content">
        <p className="last__copy" data-reveal>
          <span>香りは、目には見えない。</span>
          <span>けれど、心には残る。</span>
        </p>
        <p className="last__copy2" data-reveal>
          神話の香りを、あなたの日常へ。
        </p>
        <h2 id="last-title" className="last__logo" data-reveal>
          <span className="last__logo-en" lang="en">
            IZUMOKOU
          </span>
          <span className="last__logo-ja">出雲香</span>
        </h2>
        <a href={site.storeUrl} target="_blank" rel="noopener" className="btn btn--line last__store" data-reveal>
          ONLINE STORE<span className="sr-only">（オンラインストア・新しいタブで開きます）</span>
        </a>
      </div>
    </section>
  );
}
