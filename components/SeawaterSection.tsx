import ImageSlot, { hasImage } from "./ImageSlot";
import SmokeEffect from "./SmokeEffect";
import { images } from "@/data/images";

/**
 * SCENE 06 — 稲佐の浜の海水。
 * 写真がない間は「ひとしずくの海水 → 波紋 → 立ちのぼる香煙」という一連の動きで、
 * 海が香りへ変わっていくことを見せる。
 */
export default function SeawaterSection() {
  const photos = hasImage(images.seawater) || hasImage(images.making);
  return (
    <section className="seawater" aria-labelledby="seawater-title">
      <div className="seawater__art" aria-hidden="true">
        <span className="seawater__drop" />
        <span className="seawater__ripple" />
        <span className="seawater__ripple" />
        <span className="seawater__ripple" />
        <SmokeEffect className="seawater__smoke" />
      </div>

      <div className="seawater__text">
        <p className="eyebrow" data-reveal lang="en">
          From the sea of Inasa
        </p>
        <h2 id="seawater-title" className="seawater__title" data-reveal>
          海から、
          <br />
          香りへ。
        </h2>
        <p className="seawater__body" data-reveal>
          出雲香は、出雲・稲佐の浜の海水を
          <br />
          用いてつくられています。
        </p>
        <p className="seawater__body" data-reveal>
          神々を迎える浜として語り継がれてきた海。
          <br />
          その水が、ひと筋の香りになります。
        </p>
      </div>

      {photos && (
        <div className="seawater__photos">
          <ImageSlot slot={images.seawater} sizes="(min-width: 1024px) 40vw, 90vw" className="seawater__photo" />
          <ImageSlot slot={images.making} sizes="(min-width: 1024px) 30vw, 70vw" className="seawater__photo seawater__photo--sub" />
        </div>
      )}
    </section>
  );
}
