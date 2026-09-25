/**
 * 写真の差し替え用スロット。
 *
 * 画像を public/images/ に置き、src にパス（例: "/images/01-inasa-dawn.jpg"）を入れるだけで
 * サイト全体に反映されます。src が null の間は、写真を使わない表現（光・霧・余白）で成立するように
 * 各シーンを設計しています。
 *
 * 推奨サイズ：横 2400px 以上（縦長スマホ用に被写体を中央寄りに）。JPEG / WebP / AVIF。
 */
export type ImageSlotData = {
  src: string | null;
  alt: string;
  width: number;
  height: number;
};

export const images = {
  /** 01 稲佐の浜・夜明け（ファーストビュー） */
  inasaDawn: {
    src: null,
    alt: "夜明け前の稲佐の浜。霧の向こうに弁天島と水平線が見える",
    width: 2400,
    height: 1600,
  },
  /** 02 稲佐の浜・波（SCENE 01） */
  inasaWaves: {
    src: null,
    alt: "朝の光を受けて寄せる稲佐の浜の波",
    width: 2400,
    height: 1600,
  },
  /** 03 香煙（SCENE 02） */
  smoke: {
    src: null,
    alt: "暗がりに立ちのぼる出雲香の香煙",
    width: 1600,
    height: 2400,
  },
  /** 04 出雲香 商品（SCENE 07） */
  product: {
    src: null,
    alt: "出雲香 七つの香りのパッケージ",
    width: 2400,
    height: 1600,
  },
  /** 05 七つの香り（SCENE 03 の背景に使用可） */
  sevenFragrances: {
    src: null,
    alt: "並べられた出雲香 七種",
    width: 2400,
    height: 1600,
  },
  /** 06 海水（SCENE 06） */
  seawater: {
    src: null,
    alt: "手のひらにすくった稲佐の浜の海水",
    width: 1600,
    height: 2000,
  },
  /** 07 制作風景（SCENE 06） */
  making: {
    src: null,
    alt: "出雲香をひとつずつ仕上げる制作の様子",
    width: 1600,
    height: 2000,
  },
  /** 08 ブランドストーリー（SCENE 05） */
  story: {
    src: null,
    alt: "出雲香の作り手",
    width: 1600,
    height: 2000,
  },
  /** 09 稲佐の浜・夕暮れ（LAST SCENE） */
  inasaDusk: {
    src: null,
    alt: "夕暮れの稲佐の浜と、空へほどけていく香煙",
    width: 2400,
    height: 1600,
  },
} satisfies Record<string, ImageSlotData>;
