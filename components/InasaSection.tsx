import ImageSlot, { hasImage } from "./ImageSlot";
import { images } from "@/data/images";

/**
 * SCENE 01 — 神々が集う海。
 * 朝の光に白む稲佐の浜。巨大な一行の言葉を、それ自体ひとつの風景として置く。
 * 空・光・海面・霧の層がそれぞれ違う速さで動くパララックス。
 */
export default function InasaSection() {
  const photo = hasImage(images.inasaWaves);
  return (
    <section id="story" className={`inasa ${photo ? "has-photo" : ""}`} data-progress aria-labelledby="inasa-title">
      <div className="inasa__scene" aria-hidden="true">
        <div className="inasa__light" />
        <div className="inasa__sea">
          <span className="inasa__swell" />
          <span className="inasa__swell" />
          <span className="inasa__swell" />
        </div>
        <div className="inasa__mist" />
        <ImageSlot slot={images.inasaWaves} className="inasa__photo" />
      </div>

      <div className="inasa__text">
        <p className="inasa__place" data-reveal>
          <span lang="en">INASA NO HAMA</span>
          <span>出雲・稲佐の浜</span>
        </p>
        <h2 id="inasa-title" className="inasa__title" data-reveal>
          <span>神々が集う</span>
          <span>海から。</span>
        </h2>
        <p className="inasa__note" data-reveal>
          旧暦十月、八百万の神々は
          <br />
          この浜から出雲へ上がると伝えられています。
        </p>
      </div>
    </section>
  );
}
