/**
 * 出雲香 七つの香り — 香りに関する情報はすべてこのファイルで管理します。
 *
 * 【確定情報】name（香りの名前）/ note（香調）/ noteEn
 * 【仮情報】drafts に列挙した項目は、確認前の仮テキスト・仮設定です。
 *   確定したら値を書き換え、drafts から項目名を外してください。
 *
 *  - copy     : 短いコピー（仮）
 *  - moment   : おすすめの時間（仮）
 *  - color    : 光の色。パッケージの色を参考にした仮の値
 *  - price    : 価格（未確定のため null。null の間は「オンラインストアにてご確認ください」と表示）
 *  - storeUrl : 商品ページ URL（null の間は site.storeUrl を使用）
 *  - image    : 商品写真（public/images/products/）。null の間は CSS で描いたパッケージを表示
 *               写真は箱の全体が入るように切り抜き、width / height は実寸のピクセル数（比率の維持に使用）
 */

export type DraftField = "copy" | "moment" | "color" | "price" | "storeUrl" | "image";

export type Fragrance = {
  /** URL に使う識別子 */
  slug: string;
  /** 章番号（ローマ数字表記に使用） */
  order: number;
  /** 香りの名前 */
  name: string;
  /** 香調（日本語） */
  note: string;
  /** 香調（英語） */
  noteEn: string;
  /** 短いコピー。改行は \n */
  copy: string;
  /** おすすめの時間 */
  moment: string;
  /** 光の色（霧の奥に灯る色）。パッケージ色を参考 */
  color: string;
  /** 価格（税込・円）。未確定なら null */
  price: number | null;
  /** 商品ページ URL。未確定なら null */
  storeUrl: string | null;
  /** 商品写真。public/ 以下のパス。未確定なら null */
  image: { src: string; alt: string; width: number; height: number } | null;
  /** 仮情報の項目 */
  drafts: DraftField[];
};

const ALL_DRAFT: DraftField[] = ["copy", "moment", "color", "price", "storeUrl", "image"];
/** 正式な商品写真が入った香り（写真以外は仮のまま） */
const WITHOUT_IMAGE: DraftField[] = ALL_DRAFT.filter((d) => d !== "image");

export const fragrances: Fragrance[] = [
  {
    slug: "bergamot",
    order: 1,
    name: "縁",
    note: "ベルガモット",
    noteEn: "BERGAMOT",
    copy: "めぐり逢いは、\nいつも香りのように。",
    moment: "大切な人に会う前に",
    color: "#a9cdd8",
    price: null,
    storeUrl: null,
    image: { src: "/images/products/bergamot.jpg", alt: "出雲香「縁」のパッケージ", width: 401, height: 2131 },
    drafts: WITHOUT_IMAGE,
  },
  {
    slug: "palo-santo",
    order: 2,
    name: "結",
    note: "パロサント",
    noteEn: "PALO SANTO",
    copy: "ほどけないものを、\nそっと結ぶ。",
    moment: "誰かを想う夜に",
    color: "#c6bfdc",
    price: null,
    storeUrl: null,
    image: { src: "/images/products/palo-santo.jpg", alt: "出雲香「結」のパッケージ", width: 208, height: 1063 },
    drafts: WITHOUT_IMAGE,
  },
  {
    slug: "agarwood",
    order: 3,
    name: "和",
    note: "沈香",
    noteEn: "AGARWOOD",
    copy: "静けさは、\nいつも内側にある。",
    moment: "一日の終わりに",
    color: "#d3d88f",
    price: null,
    storeUrl: null,
    image: { src: "/images/products/agarwood.jpg", alt: "出雲香「和」のパッケージ", width: 447, height: 2359 },
    drafts: WITHOUT_IMAGE,
  },
  {
    slug: "sandalwood",
    order: 4,
    name: "心",
    note: "白檀",
    noteEn: "SANDALWOOD",
    copy: "こころを、\nまんなかへ還す。",
    moment: "読書や瞑想のひとときに",
    color: "#c9c1da",
    price: null,
    storeUrl: null,
    image: { src: "/images/products/sandalwood.jpg", alt: "出雲香「心」のパッケージ", width: 417, height: 2190 },
    drafts: WITHOUT_IMAGE,
  },
  {
    slug: "marine",
    order: 5,
    name: "神迎",
    note: "マリン",
    noteEn: "MARINE",
    copy: "神々を迎える浜の、\nあの朝の風。",
    moment: "窓をひらいた朝に",
    color: "#b3d5de",
    price: null,
    storeUrl: null,
    image: { src: "/images/products/marine.jpg", alt: "出雲香「神迎」のパッケージ", width: 434, height: 2300 },
    drafts: WITHOUT_IMAGE,
  },
  {
    slug: "magnolia",
    order: 6,
    name: "感謝",
    note: "木蓮",
    noteEn: "MAGNOLIA",
    copy: "ありがとうを、\nひと筋の香りに。",
    moment: "感謝を伝えたい日に",
    color: "#e2c7cd",
    price: null,
    storeUrl: null,
    image: { src: "/images/products/magnolia.jpg", alt: "出雲香「感謝」のパッケージ", width: 446, height: 2387 },
    drafts: WITHOUT_IMAGE,
  },
  {
    slug: "frankincense",
    order: 7,
    name: "恵海",
    note: "乳香",
    noteEn: "FRANKINCENSE",
    copy: "海のめぐみに、\n静かな祈りを。",
    moment: "祈りのひとときに",
    color: "#86a3cf",
    price: null,
    storeUrl: null,
    image: { src: "/images/products/frankincense.jpg", alt: "出雲香「恵海」のパッケージ", width: 352, height: 1953 },
    drafts: WITHOUT_IMAGE,
  },
];

export const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII"] as const;

export function getFragrance(slug: string): Fragrance | undefined {
  return fragrances.find((f) => f.slug === slug);
}

export function formatPrice(price: number | null): string | null {
  if (price == null) return null;
  return `¥${price.toLocaleString("ja-JP")}（税込）`;
}
