import Atmosphere from "./Atmosphere";
import ImageSlot, { hasImage } from "./ImageSlot";
import { images } from "@/data/images";

/**
 * FIRST VIEW — 夜明け前の稲佐の浜。
 * sticky で画面にとどまり、スクロールに合わせて霧が晴れ、光が満ち、文字が霧に溶けていく。
 */
export default function Hero() {
  const photo = hasImage(images.inasaDawn);
  return (
    <section className="hero" data-atmo-host data-sticky aria-labelledby="hero-title">
      <div className="hero__stage">
        <ImageSlot slot={images.inasaDawn} priority className="hero__photo" />
        <Atmosphere mode="dawn" overlay={photo} />
        <div className="hero__content">
          <h1 id="hero-title" className="hero__title">
            <span className="hero__en">IZUMOKOU</span>
            <span className="hero__ja">出雲香</span>
          </h1>
          <p className="hero__tagline">神話の香りを纏う</p>
        </div>
        <a href="#story" className="scroll-cue">
          <span className="scroll-cue__en">SCROLL</span>
          <span className="scroll-cue__ja">神話の國へ</span>
          <span className="scroll-cue__line" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
