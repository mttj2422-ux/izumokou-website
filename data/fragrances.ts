/**
 * 出雲香 七つの香り — 香りに関する情報はすべてこのファイルで管理します。
 *
 * 【確定情報】
 *  - name / note / noteEn          : 香りの名前と香調
 *  - theme / moment / scenes / description
 *                                  : 公式資料「出雲香と過ごす、7つの時間」より
 *  - deity                         : 公式資料「八百万の神々と出会う - 香りの神話 -」より
 *  - image                         : 正式な商品写真（public/images/products/）
 *
 * 【仮情報】drafts に列挙した項目は、確認前の仮の値です。
 *   確定したら値を書き換え、drafts から項目名を外してください。
 *  - color    : 光の色。パッケージの色を参考にした仮の値
 *  - price    : 価格（未確定のため null。null の間は「オンラインストアにてご確認ください」と表示）
 *  - storeUrl : 商品ページ URL（null の間は site.storeUrl を使用）
 */

export type DraftField = "color" | "price" | "storeUrl" | "image";

export type Deity = {
  /** 香りに宿る神様 */
  name: string;
  /** 神様のテーマ */
  theme: string;
  /** 神様と香りの物語 */
  story: string;
};

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
  /** 香りのテーマ（短い言葉） */
  theme: string;
  /** おすすめの時間 */
  moment: string;
  /** こんな時に */
  scenes: string[];
  /** 香りのひとこと */
  description: string;
  /** 香りに宿る神様 */
  deity: Deity;
  /** 光の色（霧の奥に灯る色）。パッケージ色を参考 */
  color: string;
  /** 価格（税込・円）。未確定なら null */
  price: number | null;
  /** 商品ページ URL。未確定なら null */
  storeUrl: string | null;
  /** 商品写真。public/ 以下のパス。width / height は実寸のピクセル数（比率の維持に使用） */
  image: { src: string; alt: string; width: number; height: number } | null;
  /** 仮情報の項目 */
  drafts: DraftField[];
};

const DRAFTS: DraftField[] = ["color", "price", "storeUrl"];

export const fragrances: Fragrance[] = [
  {
    slug: "bergamot",
    order: 1,
    name: "縁",
    note: "ベルガモット",
    noteEn: "BERGAMOT",
    theme: "ご縁を結び、感謝を深める",
    moment: "夜｜一日の終わりにご縁へ感謝する時間",
    scenes: ["今日出会った人を思い返す", "人とのつながりに「ありがとう」を伝えたい夜", "静かに心を整えたい就寝前に"],
    description: "明るくやさしい柑橘の香りが心をほどきます",
    deity: {
      name: "クシナダヒメ",
      theme: "ご縁を結ぶ",
      story: "一日の終わりに、ご縁へ感謝を込めて焚く。柑橘の柔らかな香りが心をほぐし、眠りへ導く。",
    },
    color: "#a9cdd8",
    price: null,
    storeUrl: null,
    image: { src: "/images/products/bergamot.jpg", alt: "出雲香「縁」のパッケージ", width: 401, height: 2131 },
    drafts: DRAFTS,
  },
  {
    slug: "palo-santo",
    order: 2,
    name: "結",
    note: "パロサント",
    noteEn: "PALO SANTO",
    theme: "絆を深め、心を浄化する",
    moment: "朝｜新しい一日を迎えるはじまりの時間",
    scenes: ["朝の身支度の前に", "大切な人との一日を始める時に", "気持ちを切り替えたい朝に"],
    description: "神秘的な香りが清らかなスタートを導きます",
    deity: {
      name: "スサノオ",
      theme: "絆を深める",
      story: "朝焚くことで、清らかな香りが心を浄化し、大切な人と絆を感じる一日のスタートに。",
    },
    color: "#c6bfdc",
    price: null,
    storeUrl: null,
    image: { src: "/images/products/palo-santo.jpg", alt: "出雲香「結」のパッケージ", width: 208, height: 1063 },
    drafts: DRAFTS,
  },
  {
    slug: "agarwood",
    order: 3,
    name: "和",
    note: "沈香",
    noteEn: "AGARWOOD",
    // 資料の表記は「香心を鎮め、調和へ導く」。神話の資料（オオクニヌシ「心を鎮める」）に合わせて「心を鎮め」としています（要確認）
    theme: "心を鎮め、調和へ導く",
    moment: "静かな時間｜心を落ち着けたいとき",
    scenes: ["瞑想・読経・祈りの時間", "茶の時間、書斎で過ごすひととき", "深く自分と向き合いたい時"],
    description: "空間が凛と整い呼吸が深くなります",
    deity: {
      name: "オオクニヌシ",
      theme: "心を鎮める",
      story: "茶室や書斎に漂わせれば、空気が凛と整い、深い呼吸と共に心が澄んでいく。",
    },
    color: "#d3d88f",
    price: null,
    storeUrl: null,
    image: { src: "/images/products/agarwood.jpg", alt: "出雲香「和」のパッケージ", width: 447, height: 2359 },
    drafts: DRAFTS,
  },
  {
    slug: "sandalwood",
    order: 4,
    name: "心",
    note: "白檀",
    noteEn: "SANDALWOOD",
    theme: "内面を癒し安心をもたらす",
    moment: "日常の合間｜ほっと一息つく時間",
    scenes: ["読書やお茶の時間", "疲れた日の夜", "何も考えずくつろぎたいとき"],
    description: "甘くやさしい香りが心を包み込みます",
    deity: {
      name: "アマテラス",
      theme: "内面を癒す",
      story: "甘く優しい香りに包まれ、心がほっとほどける。毎日のリラックスタイムに。",
    },
    color: "#c9c1da",
    price: null,
    storeUrl: null,
    image: { src: "/images/products/sandalwood.jpg", alt: "出雲香「心」のパッケージ", width: 417, height: 2190 },
    drafts: DRAFTS,
  },
  {
    slug: "marine",
    order: 5,
    name: "神迎",
    note: "マリン",
    noteEn: "MARINE",
    theme: "未来を照らし心をクリアに",
    moment: "変わり目の時間｜気持ちを切り替えたいとき",
    scenes: ["お風呂上がり", "在宅ワークや作業前", "新しいことを始める前に"],
    description: "海風のような香りが前へ進む力をくれます",
    deity: {
      name: "ワダツミ",
      theme: "未来を照らす",
      story: "海風のような透明感。お風呂上がりに焚けば、まるでリゾートにいるかのよう。",
    },
    color: "#b3d5de",
    price: null,
    storeUrl: null,
    image: { src: "/images/products/marine.jpg", alt: "出雲香「神迎」のパッケージ", width: 434, height: 2300 },
    drafts: DRAFTS,
  },
  {
    slug: "magnolia",
    order: 6,
    name: "感謝",
    note: "木蓮",
    noteEn: "MAGNOLIA",
    theme: "愛と調和を育む",
    moment: "家族の時間｜人を想うひととき",
    scenes: ["家族団らんの時間", "記念日や節目の日", "大切な人を思い出す時"],
    description: "上品な花の香りが感謝の気持ちをやさしく広げます",
    deity: {
      name: "イザナミ",
      theme: "愛と調和",
      story: "家族で過ごすリビングに。上品な花の香りが「ありがとう」の気持ちを包み込む。",
    },
    color: "#e2c7cd",
    price: null,
    storeUrl: null,
    image: { src: "/images/products/magnolia.jpg", alt: "出雲香「感謝」のパッケージ", width: 446, height: 2387 },
    drafts: DRAFTS,
  },
  {
    slug: "frankincense",
    order: 7,
    name: "恵海",
    note: "乳香",
    noteEn: "FRANKINCENSE",
    // 資料の表記は「香ひらめきと直感を高める」。神話の資料（サルタヒコ「ひらめき.直感」）に合わせて「ひらめきと直感を高める」としています（要確認）
    theme: "ひらめきと直感を高める",
    moment: "自分とつながる時間｜感性を研ぎ澄ますとき",
    scenes: ["ヨガや瞑想", "アイデア出しや創作前", "静かに心を整えたい夜"],
    description: "思考が澄み、直感が冴えていきます",
    deity: {
      name: "サルタヒコ",
      theme: "ひらめき・直感",
      story: "静かな空間で深呼吸。清らかな香りが不安を手放し、未来へ導いてくれる。",
    },
    color: "#86a3cf",
    price: null,
    storeUrl: null,
    image: { src: "/images/products/frankincense.jpg", alt: "出雲香「恵海」のパッケージ", width: 352, height: 1953 },
    drafts: DRAFTS,
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
